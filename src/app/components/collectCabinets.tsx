'use client'
import React from "react";
import { useDataContext } from "../context/dataContext";


interface CabinetType {
    cabinet_id: number;
    cabinet_status: string;
}

interface CabinetContextType {
    collectCabients: CabinetType[];
}

const CollectCabients = () => {
    const { collectCabients } = useDataContext() as CabinetContextType;

    return (
        <div>
            <h5>{collectCabients.length}</h5>
        </div>
    )
};

export default CollectCabients;
