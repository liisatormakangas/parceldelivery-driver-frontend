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

const FreeCabinets = () => {
    const { selectedLocker} = useLockerContext() as LockerContextType;
    const [freeCabinets, setFreeCabinets] = useState([]);

    useEffect(() => {
        const cabinets = async () => {
            const response = await getCabinets(selectedLocker);
            setFreeCabinets(response.filter((item: CabinetType) => item.cabinet_status === 'free'));
        };
        cabinets();
    }   
    , []);

    const cabinetList = freeCabinets.map((cabinet: CabinetType) => {
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