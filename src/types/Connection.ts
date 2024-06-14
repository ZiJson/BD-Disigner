export type Connection = {
    id: number;
    startNodeId: number;
    endNodeId: number;
};

export type FieldNode = {
    id: number;
    tableId: number;
    fieldId: number;
    coordinates: {
        x: number;
        y: number;
    };
};
