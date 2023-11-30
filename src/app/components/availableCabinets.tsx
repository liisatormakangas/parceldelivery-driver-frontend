'use client'
import React from "react";
import { useDataContext } from "../context/dataContext";

interface ParcelType {
    parcel_id: number;
    parcel_status: string;
}
interface ParcelContextType {
    transportParcels: ParcelType[];
}

interface CabinetType {
    cabinet_id: number;
    cabinet_status: string;
}
interface CabinetContextType {
    collectCabients: CabinetType[];
    freeCabinets: CabinetType[];
}

const AvailableCabients = () => {
    const { freeCabinets, collectCabients } = useDataContext() as CabinetContextType;
    const { transportParcels } = useDataContext() as ParcelContextType;

    const availableCabients = freeCabinets.length + collectCabients.length;

    return (
        <div className="text-red-500 font-bold italic text-lg items-start pt-6 pl-4">
            {(availableCabients <= transportParcels.length) ? <div>Note! Not enough free cabinets for all parcels</div> : null}
        </div>
    );
}

export default AvailableCabients;