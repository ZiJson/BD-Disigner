"use client";
import React, { useEffect, useState, useRef } from "react";
import TableModal from "../components/TableModal";
import Draggable from "@/components/dnd/Draggable";
import Canvas from "@/components/Canvas";
import { useWorkspaceStore } from "@/providers/workspace-store-provider";
import { Button } from "@/components/ui/button";
import ConnectLine from "@/components/ConnectLine";
import { Coordinates } from "@dnd-kit/core/dist/types";

const Page = () => {
    const [isItemDragging, setIsItemDragging] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    const {
        tables,
        addTable,
        removeTable,
        nodes,
        lines,
        canvas: { scale: canvasScale },
    } = useWorkspaceStore((state) => state);

    return (
        <div>
            <Canvas isItemDragging={isItemDragging} canvasRef={canvasRef}>
                {tables.map((table) => (
                    <Draggable
                        key={table.id}
                        draggableId={table.id.toString()}
                        scale={canvasScale}
                        setIsItemDragging={setIsItemDragging}
                        canvasRef={canvasRef}
                    >
                        <TableModal
                            onRemove={() => removeTable(table.id)}
                            tableData={table}
                        />
                    </Draggable>
                ))}
                <div className="absolute -z-10 ">
                    {lines.map((line) => {
                        return (
                            <ConnectLine
                                key={line.id}
                                start={
                                    nodes.find(
                                        (node) => node.id === line.startNodeId
                                    )?.coordinates
                                }
                                end={
                                    nodes.find(
                                        (node) => node.id === line.endNodeId
                                    )?.coordinates
                                }
                            />
                        );
                    })}
                </div>
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
