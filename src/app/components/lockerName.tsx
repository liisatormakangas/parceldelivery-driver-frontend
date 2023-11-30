'use client'
import React from "react";
import { useLockerContext } from "../context/lockerContext";
import { lockerLocations } from "../components/lockerLocations";

interface LockerContextType {
    selectedLocker: number;
}
const LockerName = (props: any) => {
    const num = props.locker
    console.log("lockerName  " + num)
    const { selectedLocker } = useLockerContext() as LockerContextType;

    return (
        <div className="mb-4 mt-10">
            <h2 className="text-2xl font-bold">Locker {num}</h2>
            {lockerLocations(num)}
        </div>
    )
};

export default LockerName;