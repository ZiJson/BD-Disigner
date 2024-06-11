'use client';
import React, { useEffect } from "react";
import prototypes from "prop-types";
import Path, { Svg } from "react-svg-path";

const ConnectLine = ({ start, end }) => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const width = Math.max(Math.abs(deltaX),4);
    const height = Math.max(Math.abs(deltaY),4);

    const epsilon = 0

    const startPoint = [deltaX < 0 ? width : 0, deltaY < 0 ? height : 0];
    const endPoint = [deltaX < 0 ? 0 : width, deltaY < 0 ? 0 : height];

    const path = new Path()
        .M(startPoint[0], startPoint[1])
        .L(width / 2, startPoint[1])
        .L(width / 2, endPoint[1])
        .L(endPoint[0], endPoint[1]);
    const viewBox = `0 0 ${width} ${height}`;

    const positionStyle = {
        top: Math.min(start.y, end.y)-2,
        left: Math.min(start.x, end.x),
    };
    return (
        <Svg width={width} height={height+4} viewBox={viewBox} className="absolute" style={positionStyle}>
            {path.toComponent({
                fill: 'none',
                stroke: "rgb(100 116 139)",
                strokeWidth: 4,
            })}
        </Svg>
    );
};

ConnectLine.prototypes = {
    start: { x: prototypes.number, y: prototypes.number },
    end: { x: prototypes.number, y: prototypes.number },
};
export default ConnectLine;
