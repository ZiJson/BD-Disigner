import React from "react";
import { X } from "lucide-react";

interface Props {
    onRemove: () => void;
}
const TableModal = ({ onRemove }: Props) => {
    return (
        <div className=" w-36 h-48 border-2 bg-white border-slate-500 rounded-lg">
            <X
                className="absolute right-1 top-1 cursor-pointer text-slate-500 hover:text-slate-900"
                onClick={onRemove}
            />
        </div>
    );
};

export default TableModal;
