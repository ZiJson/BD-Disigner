"use client";
import React, { useEffect, useState } from "react";
import TableModal from "../components/TableModal";
import Draggable from "@/components/dnd/Draggable";
import Canvas from "@/components/Canvas";
import { useWorkspaceStore } from "@/providers/workspace-store-provider";

const Page = () => {
    const [canvasScale, setCanvasScale] = useState(1);
    const [isItemDragging, setIsItemDragging] = useState(false);

    const { tables, addTable, removeTable } = useWorkspaceStore(
        (state) => state
    );
    useEffect(() => {
        addTable();
    }, []);
    console.log(tables);
    return (
        <Canvas
            canvasScale={canvasScale}
            setCanvasScale={setCanvasScale}
            isItemDragging={isItemDragging}
        >
            {tables.map((table) => (
                <Draggable
                    key={table.id}
                    draggableId={table.id.toString()}
                    scale={canvasScale}
                    setIsItemDragging={setIsItemDragging}
                >
                    <TableModal />
                </Draggable>
            ))}
            {/* <>
                <Draggable
                    draggableId="table1"
                    scale={canvasScale}
                    setIsItemDragging={setIsItemDragging}
                >
                    <TableModal />
                </Draggable>
                <Draggable
                    draggableId="table2"
                    scale={canvasScale}
                    setIsItemDragging={setIsItemDragging}
                >
                    <TableModal />
                </Draggable>
            </> */}
        </Canvas>
    );
};

export default Page;
