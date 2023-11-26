'use client';
import React from "react";
import { useLockerContext } from "../context/lockerContext";
import Link from "next/link";



const LockerList = () => {
    const { setSelectedLocker } = useLockerContext() as any
    const path = "/lockerDetails";
    
    const handleClick = (lockerNumber: number) => {
        setSelectedLocker(lockerNumber);
    }

    return (
        <div className="flex flex-col">
             <div>
                <h1>Locker List</h1>
            </div>
            <div className="body flex flex-col">
                <Link href={path} passHref legacyBehavior>
                    <a onClick={() => handleClick(1)} className="text-orange-500 underline font-bold">Locker 1</a>
                </Link>
                <Link href={path} passHref legacyBehavior>
                    <a onClick={() => handleClick(2)} className="text-orange-500 underline font-bold">Locker 2</a>
                </Link>
                <Link href={path} passHref legacyBehavior>
                    <a onClick={() => handleClick(3)} className="text-orange-500 underline font-bold">Locker 3</a>
                </Link>
                <Link href={path} passHref legacyBehavior>
                    <a onClick={() => handleClick(4)} className="text-orange-500 underline font-bold">Locker 4</a>
                </Link>
                <Link href={path} passHref legacyBehavior>
                    <a onClick={() => handleClick(5)} className="text-orange-500 underline font-bold">Locker 5</a>
                </Link>
            </div>
        </div>
    )
};

export default LockerList;