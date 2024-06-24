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
            let startPoint = {
              ...nodes.find((node) => node.id === line.startNodeId)
                ?.coordinates,
            };
            let endPoint = {
              ...nodes.find((node) => node.id === line.endNodeId)?.coordinates,
            };
            console.log(startPoint, endPoint);
            if (!startPoint.x || !endPoint.x) {
              return null;
            }
            if (startPoint.x > endPoint.x) {
              startPoint.x -= 140;
            } else {
              endPoint.x -= 140;
            }
            return (
              <ConnectLine key={line.id} start={startPoint} end={endPoint} />
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
