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
                <div className="fixed w-screen h-screen top-0 left-0 -z-10">
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
                    {/* <ConnectLine
                        start={{ x: 500, y: 300 }}
                        end={{ x: 800, y: 500 }}
                    /> */}
                    <i
                        className="w-2 h-2 rounded-full absolute bg-slate-600"
                        style={{ top: 500 - 4, left: 800 - 4 }}
                    ></i>
                    <i
                        className="w-2 h-2 rounded-full absolute bg-slate-600"
                        style={{ top: 300 - 4, left: 500 - 4 }}
                    ></i>
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
