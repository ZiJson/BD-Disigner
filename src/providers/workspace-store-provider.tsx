"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
    type WorkspaceStore,
    createWorkspaceStore,
} from "@/stores/workspace-store";

export const WorkspaceStoreContext =
    createContext<StoreApi<WorkspaceStore> | null>(null);

export interface WorkspaceStoreProviderProps {
    children: ReactNode;
}

export const WorkspaceStoreProvider = ({
    children,
}: WorkspaceStoreProviderProps) => {
    const storeRef = useRef<StoreApi<WorkspaceStore>>();
    if (!storeRef.current) {
        storeRef.current = createWorkspaceStore();
    }

    return (
        <WorkspaceStoreContext.Provider value={storeRef.current}>
            {children}
        </WorkspaceStoreContext.Provider>
    );
};

export const useWorkspaceStore = <T,>(
    selector: (store: WorkspaceStore) => T
): T => {
    const workspaceStoreContext = useContext(WorkspaceStoreContext);

    if (!workspaceStoreContext) {
        throw new Error(
            `useWorkspaceStore must be use within WorkspaceStoreProvider`
        );
    }

    return useStore(workspaceStoreContext, selector);
};
