export type BasicType = {
    name: string;
};

export type INT = {
    name: "INT";
} & BasicType;

export type FLOAT = {
    name: "FLOAT";
} & BasicType;

export type BOOLEAN = {
    name: "BOOLEAN";
} & BasicType;

export type TEXT = {
    name: "TEXT";
} & BasicType;

export type DATE = {
    name: "DATE";
} & BasicType;

export type UUID = {
    name: "UUID";
} & BasicType;

export type FiledTypes = INT | FLOAT | BOOLEAN | TEXT | DATE | UUID;
