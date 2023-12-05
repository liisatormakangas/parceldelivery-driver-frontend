'use client';
import React, { useState, useEffect } from "react";
import { useLockerContext } from "../context/lockerContext";
import Link from "next/link";
import Map from "./map";

const LockerList = () => {
    const { setSelectedLocker } = useLockerContext() as any;
    const path = "/lockerDetails";
    const [greeting, setGreeting] = useState<string>("");

    useEffect(() => {
        const updateGreeting = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 0 && currentHour < 12) {
                setGreeting("Good Morning");
            } else if (currentHour >= 12 && currentHour < 18) {
                setGreeting("Good Afternoon");
            } else {
                setGreeting("Good Evening");
            }
        };

        updateGreeting();

        const intervalId = setInterval(updateGreeting, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleClick = (lockerNumber: number) => {
        setSelectedLocker(lockerNumber);
    };
    const lockerInfo = [
        "Prisma Linnanmaa",
        "K-Market Kaijonharju",
        "Lidl Tuira",
        "Lidl Pateniemi",
        "Prisma Raksila",
      ];

    return (
        <div className="p-10 border-solid border-2" style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
            <div>
                <h1 className="text-3xl">{greeting} !</h1>
            </div>
            <div className="flex ps-3 pt-5 items-center">
                <Map/>
                
                <div className="body flex flex-col border-solid border-2 p-3" style={{ marginLeft: '8rem'}}>
                    <h1 className="text-2xl pb-3">Area : PP-905-Oulu</h1>
                    {lockerInfo.map((info, index) => (
                    <Link key={index + 1} href={`/lockerDetails?lockerNumber=${index + 1}`} passHref legacyBehavior>
                        <a onClick={() => handleClick(index + 1)} className="text-lg leading-10 transition duration-300 ease-in-out hover:text-orange-500">{`Locker ${index + 1} : ${info}`}</a>
                    </Link>
                 ))}
                </div>
            </div>
        </div>
    );
};

export default LockerList;