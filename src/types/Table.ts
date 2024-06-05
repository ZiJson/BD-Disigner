import { FiledTypes } from "./FieldTypes";

export type TableModal = {
    id: number;
    name: string | null;
    fields: Field[];
};

export type Field = {
    name: string;
    type: FiledTypes;
    nullable: boolean;
    unique: boolean;
};
