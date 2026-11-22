import {createClient} from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
    if (req.method !== "POST") {
        return new Response("Method not allowed", {status: 405});
    }

    const cronSecret = Deno.env.get("CRON_SECRET");

    if (!cronSecret || req.headers.get("Authorization") !== `Bearer ${cronSecret}`) {
        return new Response("Unauthorized", {status: 401});
    }

    const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    const cutoff = new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    const {data: users, error} = await supabase
        .from("users")
        .select("user_id")
        .not("deleted_at", "is", null)
        .lte("deleted_at", cutoff)
        .limit(1000);

    if (error) {
        console.error(error);

        return Response.json(
            {error: "Failed to fetch expired users"},
            {status: 500}
        );
    }

    let deletedCount = 0;
    const failedUsers: string[] = [];

    for (const user of users ?? []) {
        const {error: deleteError} =
            await supabase.auth.admin.deleteUser(user.user_id);

        if (deleteError) {
            console.error(
                `Failed to delete user ${user.user_id}:`,
                deleteError
            );

            failedUsers.push(user.user_id);
        } else {
            deletedCount++;
        }
    }

    return Response.json({
        success: true,
        deletedCount,
        failedCount: failedUsers.length,
        failedUsers,
    });
});