'use client';
import Link from "next/link";
import React from "react";
import { lockerLocations } from "../components/lockerLocations";
import { useDataContext } from "../context/dataContext";
import { useLockerContext } from "../context/lockerContext";

interface ParcelType {
    parcel_id: number;
    parcel_status: string;
}
interface CabinetType {
    cabinet_id: number;
    cabinet_status: string;
}
interface ParcelContextType {
    transportParcels: ParcelType[];
}
interface CabinetContextType {
    freeCabinets: CabinetType[];
    collectCabients: CabinetType[];
    occupiedCabients: CabinetType[];
}
interface LockerContextType {
    selectedLocker: number;
}

const LockerDetails = () => {
    const { freeCabinets, collectCabients, occupiedCabients} = useDataContext() as CabinetContextType;
    const { transportParcels } = useDataContext() as ParcelContextType;
    const { selectedLocker } = useLockerContext() as LockerContextType;

    const availableCabients = freeCabinets.length + collectCabients.length;
    console.log(availableCabients);
    console.log((availableCabients <= transportParcels.length));
    
    return (
        <div className="p-10 border border-solid border-gray-500">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Locker {selectedLocker}</h2>
                {lockerLocations(selectedLocker)}
            </div>
            <div className="flex">
                <div className="w-3/5 pr-20">
                    <div className="font-bold mb-3 mt-3">
                        <h3>Package Information</h3>
                    </div>
                    <div className="package flex flex-row justify-between items-start pt-5">
                        <div>
                            <h5>Packages to collect from locker:</h5>
                        </div>
                        <div>
                            <h5>{collectCabients.length}</h5>
                        </div>
                        <div>
                            <Link href="/pickupLockers" className="text-green-500 underline font-bold">Proceed</Link>
                        </div>
                    </div>
                    <div className="package flex flex-row justify-between items-start pt-5">
                        <div>
                            <h5>Packages to leave to locker:</h5>
                        </div>
                        <div>
                            <h5>{transportParcels.length}</h5>
                        </div>
                        <div>
                            <Link href="/dropoffLockers" className="text-green-500 underline font-bold">Proceed</Link>
                        </div>
                    </div>
                    <div className="text-red-500 font-bold italic text-lg items-start pt-6 pl-4">
                         {(availableCabients <= transportParcels.length) ? <div>Note! Not enough free cabinets for all parcels</div>: null }
                    </div>
        
                </div>
                <div className="w-2/5">
                    <div className="font-bold mb-3 mt-3">
                        <h3>Locker Information</h3>
                    </div>
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
                </div>
            </div>
            <div className="mt-20 text-center">
                <Link href="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Back to Locker List</Link>
            </div>
        </div>
    )
};

export default LockerDetails;