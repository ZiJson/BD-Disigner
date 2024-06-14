import { createRef } from "react";
import { createStore } from "zustand/vanilla";
import { type TableModal } from "@/types/Table";
import { type Connection, type FieldNode } from "@/types/Connection";

export type WorkspaceState = {
    tables: TableModal[];
    lines: Connection[];
    nodes: FieldNode[];
};

export type WorkspaceActions = {
    addTable: () => void;
    removeTable: (id: number) => void;
    updateNode: (id: number, coordinates: { x: number; y: number }) => void;
};

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

export const defaultInitState: WorkspaceState = {
    tables: [
        {
            id: 1,
            name: `table ${1}`,
            fields: [
                {
                    name: "id",
                    type: { name: "INT" },
                    nullable: false,
                    unique: true,
                },
            ],
        },
        {
            id: 2,
            name: `table ${2}`,
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
    lines: [{ id: 1, startNodeId: 1, endNodeId: 2 }],
    nodes: [
        {
            id: 1,
            tableId: 1,
            fieldId: 1,
            coordinates: { x: 0, y: 0 },
        },
        {
            id: 2,
            tableId: 2,
            fieldId: 1,
            coordinates: { x: 0, y: 0 },
        },
    ],
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
        updateNode: (id: number, coordinates: { x: number; y: number }) =>
            set((state) => {
                const newNodes = state.nodes.map((node) => {
                    if (node.id === id) {
                        return { ...node, coordinates };
                    }
                    return node;
                });
                return { nodes: newNodes };
            }),
    }));
};
