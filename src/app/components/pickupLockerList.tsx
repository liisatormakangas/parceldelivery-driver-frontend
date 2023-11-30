'use client';
import React from "react";
import { useDataContext } from "../context/dataContext";
import { useLockerContext } from "../context/lockerContext";
import '../globals.css';


interface CabinetType {
    id_cabinet: number;
    cabinet_number: number;
    locker_number: number;
    parcel_id: number;
}

const PickupLockers = () => {
    const { cabinets, setSelectedParcel } = useDataContext() as any;
    const { selectedCabinet, setSelectedCabinet } = useLockerContext() as any;

    const handleClick = (e: any, cabinetId: number, parcelId: number) => {
        e.preventDefault();
        setSelectedCabinet(cabinetId);
        setSelectedParcel(parcelId);
    }

    const collectCabients = cabinets.filter((item: any) => item.cabinet_status === 'has_dropoff_parcel');

    //when the user clicks on a cabinet, the cabinet id is stored in selectedCabinet
    const parcelList = collectCabients.map((cab: CabinetType) => {
        const isSelected = cab.id_cabinet === selectedCabinet;
        return (
            <div key={cab.id_cabinet} onClick={(e) => handleClick(e, cab.id_cabinet, cab.parcel_id)}
                className={`grid grid-cols-2 pt-2 pb-2 pl-2 ${isSelected ? 'selected-row' : ''}`}
            >
                <h5>Parcel ID: {cab.parcel_id}</h5>
                <h5>L{cab.locker_number}: cabinet <strong>{cab.cabinet_number}</strong></h5>
            </div>
        )
    })
    return (
        <div>
            {parcelList}
        </div>
    )
};

export default PickupLockers;

