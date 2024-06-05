import { createStore } from "zustand/vanilla";
import { type TableModal } from "@/types/Table";
import { Table } from "lucide-react";

export type WorkspaceState = {
    tables: TableModal[];
};

export type WorkspaceActions = {
    addTable: () => void;
    removeTable: (id: number) => void;
};

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

export const defaultInitState: WorkspaceState = {
    tables: [],
};

export const createWorkspaceStore = (
    initState: WorkspaceState = defaultInitState
) => {
    return createStore<WorkspaceStore>()((set) => ({
        ...initState,
        addTable: () =>
            set((state) => ({
                tables: [
                    ...state.tables,
                    { id: state.tables.length + 1, name: null, fields: [] },
                ],
            })),
        removeTable: (id: number) =>
            set((state) => ({
                tables: state.tables.filter((table) => table.id !== id),
            })),
    }));
};
