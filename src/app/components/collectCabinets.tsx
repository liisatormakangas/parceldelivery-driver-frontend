'use client'
import React, { useEffect, useState } from "react";
import { useLockerContext } from "../context/lockerContext";
import { getCabinets } from '../context/apiRequests';


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

const CollectCabients = () => {
    const { selectedLocker } = useLockerContext() as LockerContextType;
    const [collectCabients, setCollectCabients] = useState([]);

    useEffect(() => {
        const cabinets = async () => {
            const response = await getCabinets(selectedLocker);
            setCollectCabients(response.filter((item: CabinetType) => item.cabinet_status === 'has_dropoff_parcel'));
            
        };
        cabinets();
    }   
    , []);

    return (
        <div>
            <h5>{collectCabients.length}</h5>
        </div>
    )
};

export default CollectCabients;
