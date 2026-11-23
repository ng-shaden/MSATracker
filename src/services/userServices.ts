import {supabase} from "../lib/supabaseClient.ts";
import type {UpdateUserDto, User} from "../model/User.ts";
import JSZip from "jszip";

export async function updateUser(userId: string, updates: UpdateUserDto): Promise<User> {
    const dbUpdates = {
        ...(updates.firstName !== undefined && {
            first_name: updates.firstName,
        }),
        ...(updates.lastName !== undefined && {
            last_name: updates.lastName,
        }),
    };

    const {data, error} = await supabase
        .from("users")
        .update(dbUpdates)
        .eq("user_id", userId)
        .select("user_id, username, email, first_name, last_name, profile_picture")
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        username: data.username,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        profilePicture: data.profile_picture,
    };
}

export async function updateProfilePicture(userId: string, fileName: string) {
    const {data, error} = await supabase
        .from("users")
        .update({profile_picture: fileName})
        .eq("user_id", userId)
        .select()
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        username: data.username,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        profilePicture: data.profile_picture,
    };
}


export async function isUsernameTaken(username: string): Promise<boolean> {
    const {data, error} = await supabase.rpc(
        "is_username_taken",
        {check_username: username}
    );

    if (error) throw error;

    return data;
}

export async function deleteUser() {
    const {error} = await supabase.rpc("delete_my_account");
    if (error) throw error;
}

async function getUserData() {
    const {data, error} = await supabase.functions.invoke("export-user-data");

    if (error) throw error;

    return data;
}

async function createUserDataArchive(): Promise<Blob> {
    const [data, response] = await Promise.all([
        getUserData(),
        fetch("/README.md"),
    ]);

    if (!response.ok) {
        throw new Error("Unable to load the export README.");
    }

    const readme = await response.text();

    const zip = new JSZip();

    zip.file("README.md", readme);
    zip.file("personal-data.json", JSON.stringify(data, null, 4));

    return zip.generateAsync({type: "blob"});
}

export async function exportUserData() {
    const archive = await createUserDataArchive();

    const url = URL.createObjectURL(archive);
    const link = document.createElement("a");

    link.href = url;
    link.download = "msatracker-personal-data.zip";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}