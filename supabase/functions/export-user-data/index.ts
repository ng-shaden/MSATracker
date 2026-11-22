import {createClient} from "npm:@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", //TODO set to domain
    "Access-Control-Allow-Headers":
        "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(
    data: unknown,
    status = 200,
    headers: Record<string, string> = {},
) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            ...headers,
        },
    });
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight.
    if (req.method === "OPTIONS") {
        return new Response("ok", {headers: corsHeaders});
    }

    if (req.method !== "POST") {
        return jsonResponse(
            {error: "Method not allowed."},
            405,
            {Allow: "POST, OPTIONS"},
        );
    }

    try {
        // Verify authentication.
        const authHeader = req.headers.get("Authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return jsonResponse(
                {error: "Authentication required."},
                401,
            );
        }

        const accessToken = authHeader.slice(7);

        // Create a Supabase client using the user's JWT.
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_ANON_KEY")!,
            {
                global: {
                    headers: {
                        Authorization: authHeader,
                    },
                },
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                },
            },
        );

        // Verify the token and retrieve the authenticated user.
        const {
            data: {user},
            error: authError,
        } = await supabase.auth.getUser(accessToken);

        if (authError || !user) {
            return jsonResponse(
                {error: "Invalid or expired session."},
                401,
            );
        }

        const userId = user.id;

        // Retrieve the user's profile.
        const {data: profile, error: profileError} = await supabase
            .from("users")
            .select(`
                user_id,
                username,
                first_name,
                last_name,
                email,
                profile_picture
            `)
            .eq("user_id", userId)
            .single();

        if (profileError) throw profileError;

        // Retrieve personal preferences.
        const {data: preferences, error: preferencesError} =
            await supabase
                .from("personal_preferences")
                .select(`
                  show_media_backdrop,
                  username_as_display_name,
                  show_extra_labels
                `)
                .eq("user_id", userId)
                .single();

        if (preferencesError) throw preferencesError;

        // Retrieve favorites.
        const {data: favorites, error: favoritesError} =
            await supabase
                .from("favorites")
                .select(`
                 media (
                    tmdb_id,
                    media_type
                  ),
                  added_at
                  `)
                .eq("user_id", userId);

        if (favoritesError) throw favoritesError;

        // Retrieve all media tracking records.
        const {data: userMedia, error: mediaError} = await supabase
            .from("user_media")
            .select(`
                added_at,
                started_at,
                completed_at,
                status,
                media (
                    tmdb_id,
                    media_type
                )
            `)
            .eq("user_id", userId);

        if (mediaError) throw mediaError;

        // Organise media records by status.
        const mediaLists = {
            watchlist: [] as unknown[],
            currentlyWatching: [] as unknown[],
            completed: [] as unknown[],
        };

        for (const item of userMedia ?? []) {
            const mediaItem = {
                ...item.media,
                addedAt: item.added_at,
                startedAt: item.started_at,
                completedAt: item.completed_at,
            };

            switch (item.status) {
                case "watchlist":
                    mediaLists.watchlist.push(mediaItem);
                    break;

                case "currently_watching":
                    mediaLists.currentlyWatching.push(mediaItem);
                    break;

                case "completed":
                    mediaLists.completed.push(mediaItem);
                    break;
            }
        }

        // Build the export.
        const exportData = {
            application: "MSATracker",
            exportedAt: new Date().toISOString(),

            account: {
                userId: profile.user_id,
                email: profile.email,
                username: profile.username,
                firstName: profile.first_name,
                lastName: profile.last_name,
                profilePicture: profile.profile_picture,
                createdAt: user.created_at,
            },

            preferences,

            favorites: (favorites ?? []).map((item) => item.media),

            media: mediaLists,
        };

        // Return the JSON as a downloadable file.
        const fileName = "msatracker-personal-data.json";

        return new Response(
            JSON.stringify(exportData, null, 4),
            {
                status: 200,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json; charset=utf-8",
                    "Content-Disposition":
                        `attachment; filename="${fileName}"`,
                    "Cache-Control": "private, no-store",
                },
            },
        );
    } catch (error) {
        console.error("User data export failed:", error);

        return jsonResponse(
            {error: "Unable to generate your data export."},
            500,
        );
    }
});
