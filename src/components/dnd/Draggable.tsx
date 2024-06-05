"use client";

import React, { useState } from "react";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import { type DragEndEvent } from "@dnd-kit/core";
interface Props {
    children: React.ReactNode;
    draggableId: string;
    scale: number;
    setIsItemDragging: (isDragging: boolean) => void;
}

function Draggable(props: Props) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const onDragEnd = (event: DragEndEvent) => {
        if (event.active.id !== props.draggableId) return;
        const { x, y } = event.delta;
        setPosition((pre) => ({
            x: pre.x + x / props.scale,
            y: pre.y + y / props.scale,
        }));
        props.setIsItemDragging(false);
    };
    const onDragStart = (event: DragEndEvent) => {
        props.setIsItemDragging(true);
    };
    useDndMonitor({ onDragEnd, onDragStart });
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.draggableId,
    });
    const transformStyle = transform
        ? {
              transform: `translate3d(${transform.x / props.scale}px, ${
                  transform.y / props.scale
              }px, 0)`,
          }
        : undefined;
    const positionStyle = {
        top: `${position.y}px`,
        left: `${position.x}px`,
    };
    return (
        <button
            onMouseMove={(e) => e.stopPropagation()}
            ref={setNodeRef}
            className="fixed"
            style={{ ...transformStyle, ...positionStyle }}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </button>
    );
}

export default Draggable;
