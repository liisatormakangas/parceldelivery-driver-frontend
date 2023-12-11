'use client'
import React, { useEffect, useState } from "react";
import { useLockerContext } from "../context/lockerContext";
import { getCabinets, getParcels } from '../context/apiRequests';

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
}

const AvailableCabients = () => {
    const { selectedLocker } = useLockerContext() as LockerContextType;
    const [freeCabinets, setFreeCabinets] = useState([]);
    const [collectCabients, setCollectCabients] = useState([]); 
    const [transportParcels, setTransportParcels] = useState([]);

    useEffect(() => {
        const cabinets = async () => {
            const response = await getCabinets(selectedLocker);
            setFreeCabinets(response.filter((item: CabinetType) => item.cabinet_status === 'free'));
            setCollectCabients(response.filter((item: CabinetType) => item.cabinet_status === 'has_dropoff_parcel'));
        };
        cabinets();
    }, [selectedLocker]);

    useEffect(() => {
        const parcels = async () => {
            const response = await getParcels(selectedLocker);
            setTransportParcels(response);
        };
        parcels();
    }, [selectedLocker]);
   
    const availableCabients = freeCabinets.length + collectCabients.length;

    return (
        <div className="text-red-500 font-bold italic text-lg items-start pt-6 pl-4">
            {(availableCabients <= transportParcels.length) ? <div>Note! Not enough free cabinets for all parcels</div> : null}
        </div>
    );
}

export default AvailableCabients;