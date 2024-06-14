"use client";
import prototypes from "prop-types";
import Path, { Svg } from "react-svg-path";

const ConnectLine = ({ start, end, strokeColor = "rgb(100 116 139)" }) => {
    console.log(start.x, end.x);
    const strokeWidth = 4;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const width = Math.max(Math.abs(deltaX), strokeWidth);
    const height = Math.max(Math.abs(deltaY), strokeWidth);

    const radius = Math.min(20, height / 2, width);

    const startPoint = [deltaX < 0 ? width : 0, deltaY < 0 ? height : 0];
    const endPoint = [deltaX < 0 ? 0 : width, deltaY < 0 ? 0 : height];

    const path = new Path()
        .M(startPoint[0], startPoint[1])
        .L(width / 2 - radius * Math.sign(deltaX), startPoint[1])
        .Q(
            width / 2,
            startPoint[1],
            width / 2,
            startPoint[1] + radius * Math.sign(deltaY)
        )
        .L(width / 2, endPoint[1] - radius * Math.sign(deltaY))
        .Q(
            width / 2,
            endPoint[1],
            width / 2 + radius * Math.sign(deltaX),
            endPoint[1]
        )
        .L(endPoint[0], endPoint[1]);
    const viewBox = `0 0 ${width} ${height}`;

    const positionStyle = {
        top: Math.min(start.y, end.y) - strokeWidth / 2,
        left: Math.min(start.x, end.x),
    };
    return (
        <Svg
            width={width}
            height={height + strokeWidth}
            viewBox={viewBox}
            className="absolute"
            style={positionStyle}
        >
            {/* <text x={width / 2} y={height / 2}>
                {`(${start.x}, ${start.y}) to (${end.x}, ${end.y})`}
            </text> */}
            {path.toComponent({
                fill: "none",
                stroke: strokeColor,
                strokeWidth,
            })}
        </Svg>
    );
};

ConnectLine.prototypes = {
    start: { x: prototypes.number, y: prototypes.number },
    end: { x: prototypes.number, y: prototypes.number },
};
export default ConnectLine;
