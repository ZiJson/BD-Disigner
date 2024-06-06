"use client";
import React, { useEffect, useState, useRef } from "react";
import TableModal from "../components/TableModal";
import Draggable from "@/components/dnd/Draggable";
import Canvas from "@/components/Canvas";
import { useWorkspaceStore } from "@/providers/workspace-store-provider";
import { Button } from "@/components/ui/button";

const Page = () => {
    const [canvasScale, setCanvasScale] = useState(1);
    const [isItemDragging, setIsItemDragging] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    const { tables, addTable, removeTable } = useWorkspaceStore(
        (state) => state
    );
    return (
        <div>
            <Canvas
                canvasScale={canvasScale}
                setCanvasScale={setCanvasScale}
                isItemDragging={isItemDragging}
                canvasRef={canvasRef}
            >
                {tables.map((table) => (
                    <Draggable
                        key={table.id}
                        draggableId={table.id.toString()}
                        scale={canvasScale}
                        setIsItemDragging={setIsItemDragging}
                        canvasRef={canvasRef}
                    >
                        <TableModal onRemove={() => removeTable(table.id)} />
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

            <Button
                onClick={addTable}
                className="absolute top-5 right-[50%] translate-x-[50%]"
            >
                New Table
            </Button>
        </div>
    );
};

export default Page;
