"use client";
import React, { useState, useRef } from "react";
import {
    DndContext,
    useSensors,
    useSensor,
    PointerSensor,
} from "@dnd-kit/core";
import { useWorkspaceStore } from "@/providers/workspace-store-provider";

type Position = {
    x: number;
    y: number;
};

interface Props {
    children: React.ReactNode;
    isItemDragging: boolean;
    canvasRef: React.RefObject<HTMLDivElement>;
}
const Canvas = ({ children, isItemDragging, canvasRef }: Props) => {
    const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
    const [canvasTranslate, setCanvasTranslate] = useState({ x: 0, y: 0 });
    const [mouseStart, setMouseStart] = useState<null | Position>(null);

    const { scaling, canvas } = useWorkspaceStore((state) => state);

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
        if (!canvasRef.current) return;
        const { x: canvasX, y: canvasY } =
            canvasRef.current.getBoundingClientRect();

        const { deltaY, clientX, clientY } = e;
        const scaleSize = deltaY < 0 ? 0.1 : -0.1;
        const tx = (clientX - canvasX) * scaleSize;
        const ty = (clientY - canvasY) * scaleSize;
        scaling(canvas.scale * (1 + scaleSize));
        setCanvasPosition((pre) => {
            return {
                x: pre.x - tx,
                y: pre.y - ty,
            };
        });
    };

    const canvasScaleStyle = {
        transform: `scale(${canvas.scale})`,
    };
    const canvasPositionStyle = {
        top: `${canvasPosition.y}px`,
        left: `${canvasPosition.x}px`,
    };
    const canvasTranslateStyle = canvasTranslate
        ? {
              translate: `${canvasTranslate.x}px ${canvasTranslate.y}px`,
          }
        : {};

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 200, tolerance: 100, distance: 8 },
        })
    );
    return (
        <DndContext sensors={sensors}>
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
                    }}
                    className="fixed w-2 h-2 rounded-full bg-slate-600"
                >
                    {children}
                </div>
            </div>
        </DndContext>
    );
};

export default Canvas;
