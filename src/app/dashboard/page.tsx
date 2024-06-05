"use client";
import React, { useState, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import TableModal from "./component/TableModal";
import Draggable from "@/lib/dnd/Draggable";
import Droppable from "@/lib/dnd/Droppable";
import { transform } from "next/dist/build/swc";

type Position = {
    x: number;
    y: number;
};

const Page = () => {
    const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
    const [canvasTranslate, setCanvasTranslate] = useState({ x: 0, y: 0 });
    const [canvasScale, setCanvasScale] = useState(1);
    const [canvasTransformOrigin, setCanvasTransformOrigin] = useState({
        x: 0,
        y: 0,
    });
    const canvasRef = useRef<HTMLDivElement>(null);
    const [mouseStart, setMouseStart] = useState<null | Position>(null);
    const [isItemDragging, setIsItemDragging] = useState(false);

    console.log(canvasPosition);
    const canvasPositionStyle = {
        top: `${canvasPosition.y}px`,
        left: `${canvasPosition.x}px`,
    };
    const canvasTranslateStyle = canvasTranslate
        ? {
              translate: `${canvasTranslate.x}px ${canvasTranslate.y}px`,
          }
        : {};
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isItemDragging) return;
        setMouseStart({ x: e.clientX, y: e.clientY });
    };
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!mouseStart || isItemDragging) return;
        const deltaX = e.clientX - mouseStart.x;
        const deltaY = e.clientY - mouseStart.y;
        setCanvasTranslate((pre) => ({
            x: deltaX,
            y: deltaY,
        }));
    };

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isItemDragging) return;

        setMouseStart(null);
        setCanvasPosition((pre) => ({
            x: pre.x + canvasTranslate.x,
            y: pre.y + canvasTranslate.y,
        }));
        setCanvasTranslate({
            x: 0,
            y: 0,
        });
    };

    const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!canvasRef.current) return;
        const { x: canvasX, y: canvasY } =
            canvasRef.current.getBoundingClientRect();

        const { deltaY, clientX, clientY } = e;
        const scaleSize = deltaY < 0 ? 0.1 : -0.1;
        const tx = (clientX - canvasX) * scaleSize;
        const ty = (clientY - canvasY) * scaleSize;
        setCanvasScale((pre) => pre * (1 + scaleSize));
        setCanvasPosition((pre) => {
            return {
                x: pre.x - tx,
                y: pre.y - ty,
            };
        });
    };

    const canvasScaleStyle = {
        transform: `scale(${canvasScale})`,
    };
    const canvasTransformOriginStyle = {
        transformOrigin: `${canvasTransformOrigin.x}px ${canvasTransformOrigin.y}px`,
    };

    return (
        <DndContext>
            <div
                onWheel={onWheel}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                className="absolute overflow-hidden inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] "
            >
                <div
                    ref={canvasRef}
                    style={{
                        ...canvasPositionStyle,
                        ...canvasTranslateStyle,
                        ...canvasScaleStyle,
                        ...canvasTransformOriginStyle,
                    }}
                    className="absolute "
                >
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
                </div>
            </div>
        </DndContext>
    );
};

export default Page;
