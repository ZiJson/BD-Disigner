'use client';
import React, { useEffect, useState, useRef } from 'react';
import TableModal from '../components/TableModal';
import Draggable from '@/components/dnd/Draggable';
import Canvas from '@/components/Canvas';
import { useWorkspaceStore } from '@/providers/workspace-store-provider';
import { Button } from '@/components/ui/button';
import ConnectLine from '@/components/ConnectLine';
import { Coordinates } from '@dnd-kit/core/dist/types';

const Page = () => {
    const [canvasScale, setCanvasScale] = useState(1);
    const [isItemDragging, setIsItemDragging] = useState(false);
    const [mouseCoor, setMouseCoor] = useState<Coordinates>({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    const { tables, addTable, removeTable } = useWorkspaceStore(
        (state) => state
    );

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e);
        setMouseCoor({ x: e.clientX, y: e.clientY });
    };

    return (
        <div onMouseMove={onMouseMove}>
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
                        <TableModal
                            onRemove={() => removeTable(table.id)}
                            tableData={table}
                        />
                    </Draggable>
                ))}
            </Canvas>
            <div className="fixed w-screen h-screen top-0 left-0 ">
                <ConnectLine start={{ x: 500, y: 300 }} end={mouseCoor} />
                <i
                    className="w-2 h-2 rounded-full absolute bg-slate-600"
                    style={{ top: mouseCoor.y - 4, left: mouseCoor.x - 4 }}
                ></i>
                <i
                    className="w-2 h-2 rounded-full absolute bg-slate-600"
                    style={{ top: 300 - 4, left: 500 - 4 }}
                ></i>
            </div>
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
