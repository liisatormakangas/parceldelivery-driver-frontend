'use client';
import React from "react";
import { useDataContext } from "../context/dataContext";


interface CabinetType {
    id_cabinet: number;
    cabinet_status: string;
};
interface CabinetContextType {
    freeCabinets: CabinetType[];
    occupiedCabients: CabinetType[];
};

const FreeCabinets = () => {
    const { freeCabinets, occupiedCabients } = useDataContext() as CabinetContextType;


    const cabinetList = freeCabinets.map((cabinet: any) => {
        return (
            <div key={cabinet.id_cabinet} className="grid grid-cols-2 gap-3">
                <h5>Cabinet number: {cabinet.id_cabinet}</h5>
                <h5>{cabinet.cabinet_status}</h5>
            </div>
        )
    })
    return (
        <>
            {(freeCabinets.length > 0) ?
                <div>
                    {cabinetList}
                </div>
                : <h5>No free cabinets</h5>}
        </>
    );
};

export default FreeCabinets;