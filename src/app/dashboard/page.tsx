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
        resizeParent();
        if (!mouseStart || isItemDragging) return;
        console.log("move");
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
        const { deltaY, clientX, clientY } = e;
        // calcTransformOrigin({ clientX, clientY });

        const scaleCalc = 1 - deltaY * 0.001;
        setCanvasScale((pre) => pre * scaleCalc);
    };

    const calcTransformOrigin = ({ clientX, clientY }: any) => {
        if (!canvasRef.current) return;
        const { x: canvasX, y: canvasY } =
            canvasRef.current.getBoundingClientRect();
        setCanvasTransformOrigin({
            x: (clientX - canvasX) / canvasScale,
            y: (clientY - canvasY) / canvasScale,
        });
    };
    const canvasScaleStyle = {
        transform: `scale(${canvasScale})`,
    };
    const canvasTransformOriginStyle = {
        transformOrigin: `${canvasTransformOrigin.x}px ${canvasTransformOrigin.y}px`,
    };

    function resizeParent() {
        if (!canvasRef.current) return;
        const children = canvasRef.current.childNodes;
        console.log(children);
        let maxWidth = 0;
        let maxHeight = 0;

        children.forEach((child) => {
            console.log(child);
            // const rect = child.;
            // maxWidth = Math.max(maxWidth, rect.right);
            // maxHeight = Math.max(maxHeight, rect.bottom);
        });

        // parent.style.width = `${maxWidth}px`;
        // parent.style.height = `${maxHeight}px`;
    }

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
                    className="absolute  w-fit h-fit border-slate-900 origin-top-left border-2 inline-block"
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
