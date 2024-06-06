import React from "react";
import prototypes from "prop-types";
import Path, { Svg } from "react-svg-path";

const ConnectLine = ({ start, end }) => {
    const width = Math.abs(start.x - end.x);
    const height = Math.abs(start.y - end.y);

    const path = new Path()
        .M(start.x, start.y)
        .L(start.x + width / 2, start.y)
        .L(start.x + width / 2, end.y)
        .L(end.x, end.y);
    const viewBox = `${start.x - 3} ${start.y - 3} ${width + 10} ${
        height + 10
    }`;
    return (
        <Svg width={width} height={height} viewBox={viewBox}>
            {path.toComponent({
                fill: "none",
                stroke: "rgb(100 116 139)",
                strokeWidth: 2,
            })}
        </Svg>
    );
};

ConnectLine.prototypes = {
    start: { x: prototypes.number, y: prototypes.number },
    end: { x: prototypes.number, y: prototypes.number },
};
export default ConnectLine;
