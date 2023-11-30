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

const TransportParcels = () => {
    const { transportParcels } = useDataContext() as ParcelContextType;

    return (
        <div>
            <h5>{transportParcels.length}</h5>
        </div>
    )       
};

export default TransportParcels;