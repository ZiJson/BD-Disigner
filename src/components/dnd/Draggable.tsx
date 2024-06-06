"use client";

import React, { useEffect, useState } from "react";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import { type DragEndEvent } from "@dnd-kit/core";
import { Scale } from "lucide-react";
import { type Coordinates } from "@dnd-kit/core/dist/types";
interface Props {
    children: React.ReactNode;
    draggableId: string;
    scale: number;
    setIsItemDragging: (isDragging: boolean) => void;
    canvasRef: React.RefObject<HTMLDivElement>;
}

function Draggable(props: Props) {
    const [position, setPosition] = useState<Coordinates | null>(null);
    const onDragEnd = (event: DragEndEvent) => {
        if (event.active.id !== props.draggableId) return;
        const { x, y } = event.delta;
        setPosition((pre) => ({
            x: pre?.x || 0 + x / props.scale,
            y: pre?.y || 0 + y / props.scale,
        }));
        props.setIsItemDragging(false);
    };
    const onDragStart = (event: DragEndEvent) => {
        props.setIsItemDragging(true);
    };
    useDndMonitor({ onDragEnd, onDragStart });
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: props.draggableId,
        });
    const transformStyle = transform
        ? {
              transform: `translate3d(${transform.x / props.scale}px, ${
                  transform.y / props.scale
              }px, 0)`,
          }
        : undefined;
    const positionStyle = position
        ? {
              top: `${position.y}px`,
              left: `${position.x}px`,
          }
        : undefined;
    const startPosition = () => {
        if (!props.canvasRef.current) return;
        const { x, y } = props.canvasRef.current.getBoundingClientRect();
        setPosition({ x: -x + 10, y: -y + 10 });
    };
    useEffect(() => {
        startPosition();
    }, []);
    return (
        <button
            onMouseMove={(e) => e.stopPropagation()}
            ref={setNodeRef}
            className="fixed rounded-xl"
            style={{ ...transformStyle, ...positionStyle }}
            {...listeners}
            {...attributes}
        >
            <div
                className={`transition-all duration-150 ${
                    isDragging
                        ? "scale-[1.06] shadow-xl cursor-grabbing"
                        : "scale-100"
                }`}
            >
                {props.children}
            </div>
        </button>
    );
}

export default Draggable;
