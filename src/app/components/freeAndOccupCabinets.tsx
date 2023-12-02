'use client';
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

const FreeAndOccupCabinets = () => {
    const { selectedLocker} = useLockerContext() as LockerContextType;
    const [freeCabinets, setFreeCabinets] = useState([]);
    const [occupiedCabients, setOccupiedCabients] = useState([]);

    useEffect(() => {
        const cabinets = async () => {
            const response = await getCabinets(selectedLocker);
            setFreeCabinets(response.filter((item: CabinetType) => item.cabinet_status === 'free'));
        };
        cabinets();
    }   
    , []);

    useEffect(() => {
        const cabinets = async () => {
            const response = await getCabinets(selectedLocker);
            setOccupiedCabients(response.filter((item: CabinetType) => item.cabinet_status === 'has_pickup_parcel'));
        };
        cabinets();
    }   
    , []);

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