'use client';
import React from "react";
import { useDataContext } from "../context/dataContext";


interface ParcelType {
    id_parcel: number;
    desired_pickup_locker: number;
}
interface ParcelContextType {
    transportParcels: ParcelType[];
}

const DropoffLockers = () => {
    const { transportParcels } = useDataContext() as ParcelContextType;
   
    const parcelList = transportParcels.map((parcel: ParcelType) => {
        return (
            <div key={parcel.id_parcel} className="grid grid-cols-2 pt-5">
                <h5>Parcel ID: {parcel.id_parcel}</h5>
                <h5>Desired pickup locker: {parcel.desired_pickup_locker}</h5>
            </div>
        )
    })
    return (
        <div>
            {parcelList}
        </div>
    )
};

export default DropoffLockers;
    
