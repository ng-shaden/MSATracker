import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {UpdateUserDto} from "../model/User.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {deleteUser, exportUserData, updateUser} from "../services/userServices.ts";

export function useUpdateUser() {
    const {user, setUser} = UserAuth();

    const {mutate, isPending, error} = useMutation({
        mutationFn: (userDto: UpdateUserDto) => updateUser(user!.userId, userDto),
        onSuccess: (updatedUser) => {
            setUser(updatedUser);
        },
    });

    return {
        isPending,
        error,
        updateUser: mutate,
    };
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    const {mutateAsync, isPending, error} = useMutation({
        mutationFn: () => deleteUser(),
        onSuccess: () => {
            queryClient.clear();
        },
    });

    return {
        deleteAccount: mutateAsync,
        isDeleting: isPending,
        deleteError: error
    }
}

export function useExportUserData() {
    const {mutate, isPending, error} = useMutation({
        mutationFn: exportUserData,
    });

    return {
        exportUserData: mutate,
        isExporting: isPending,
        exportError: error,
    }
}