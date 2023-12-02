'use client'
import React from "react";
import { useLockerContext } from "../context/lockerContext";
import { lockerLocations } from "../components/lockerLocations";

interface LockerContextType {
    selectedLocker: number;
    selectedCabinet: number;
}
const LockerName = () => {
    const { selectedLocker } = useLockerContext() as LockerContextType;

    return (
        <div className="mb-4 mt-10">
            <h2 className="text-2xl font-bold">Locker {selectedLocker}</h2>
            {lockerLocations(selectedLocker)}
        </div>
    )
};

export default LockerName;