"use client";
import React, { useState, useRef } from "react";
import { DndContext } from "@dnd-kit/core";

interface Props {
    children: React.ReactNode;
}
const Canvas = ({ children }: Props) => {
    const [canvasTranslate, setCanvasTranslate] = useState({ x: 0, y: 0 });
    const [canvasScale, setCanvasScale] = useState(1);
    const [isShiftDown, setIsShiftDown] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (canvasRef.current === null) return;
        const { deltaY, clientX, clientY } = e;
        const scaleCalc = 1 - deltaY * 0.001;
        setCanvasScale((pre) => pre * scaleCalc);
    };
    const canvasTranslateStyle = {
        top: `${canvasTranslate.y}px`,
        left: `${canvasTranslate.x}px`,
    };
    const canvasScaleStyle = {
        transform: `scale(${canvasScale})`,
    };
    return (
        <DndContext>
            <div
                onWheel={onWheel}
                onMouseDown={(e) => {}}
                className="absolute overflow-hidden inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] "
            >
                <div
                    ref={canvasRef}
                    style={{ ...canvasTranslateStyle, ...canvasScaleStyle }}
                    className="relative  w-fit h-fit bg-slate-500 origin-top-left border-2 border-red"
                >
                    {children}
                </div>
            </div>
        </DndContext>
    );
};

export default Canvas;
