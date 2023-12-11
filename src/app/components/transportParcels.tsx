'use client'
import React, { useState, useEffect } from "react";
import { useLockerContext } from "../context/lockerContext";
import { getParcels } from '../context/apiRequests';


interface CabinetType {
    id_cabinet: number;
    cabinet_number: number;
    locker_number: number;
    cabinet_status: string;
    parcel_id: number;
};
interface LockerContextType {
    selectedLocker: number;
    selectedCabinet: number;
};

const TransportParcels = () => {
    const { selectedLocker} = useLockerContext() as LockerContextType;
    const [transportParcels, setTransportParcels] =useState([]);

    useEffect(() => {
        const parcels = async () => {
            const response = await getParcels(selectedLocker);
            setTransportParcels(response);
        };
        parcels();
    }, [selectedLocker]);


    return (
        <div>
            <h5>{transportParcels.length}</h5>
        </div>
    )       
};

export default TransportParcels;