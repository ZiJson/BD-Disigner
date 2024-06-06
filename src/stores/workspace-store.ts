import { createStore } from "zustand/vanilla";
import { type TableModal } from "@/types/Table";

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
                    {
                        id: state.tables.length + 1,
                        name: `table ${state.tables.length + 1}`,
                        fields: [
                            {
                                name: "id",
                                type: { name: "INT" },
                                nullable: false,
                                unique: true,
                            },
                        ],
                    },
                ],
            })),
        removeTable: (id: number) =>
            set((state) => ({
                tables: state.tables.filter((table) => table.id !== id),
            })),
    }));
};
