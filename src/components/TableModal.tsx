import React from "react";
import { X } from "lucide-react";
import { type TableModal, type Field } from "@/types/Table";

interface Props {
    onRemove: () => void;
    tableData: TableModal;
}
const TableModal = ({ onRemove, tableData }: Props) => {
    return (
        <div className=" w-36 h-fit border-2 bg-white border-slate-500 rounded-lg overflow-hidden">
            <header className="font-semibold py-1 border-b-2 border-slate-500 bg-slate-100 relative rounded-t-lg">
                <X
                    className="absolute right-1  cursor-pointer text-slate-500 hover:text-slate-900"
                    onClick={onRemove}
                />
                {tableData.name}
            </header>
            <div className="">
                {tableData.fields.map((field) => (
                    <FieldRow key={field.name} field={field} />
                ))}
            </div>
        </div>
    );
};

const FieldRow = ({ field }: { field: Field }) => {
    return (
        <div className="w-full flex justify-between py-1 px-3">
            <p>{field.name}</p>
            <p className="text-slate-400">{field.type.name}</p>
        </div>
    );
};

export default TableModal;
