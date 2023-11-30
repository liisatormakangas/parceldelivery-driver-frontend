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

const FreeAndOccupCabinets = () => {
    const { freeCabinets, occupiedCabients } = useDataContext() as CabinetContextType;


    return (
        <>
            <div className="locker flex flex-row justify-between pt-5">
                <div>
                    <h5>Free cabinets in this locker:</h5>
                </div>
                <div>
                    {freeCabinets.length}
                </div>
            </div>
            <div className="locker flex flex-row justify-between pt-5">
                <div>
                    <h5>Cabinets with parcel for user pickup:</h5>
                </div>
                <div>
                    {occupiedCabients.length}
                </div>
            </div>
        </>
    );
};

export default FreeAndOccupCabinets;