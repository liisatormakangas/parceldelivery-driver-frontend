import React from "react";
import DropoffLockers from "../components/dropoffLocerList";
import FreeCabinets from "../components/freeCabinets";
import Link from "next/link";


const dropoffLockers = () => {
    return (
        <div className="flex flex-col p-10 border border-solid border-gray-500">
            <div className="text-2xl font-bold mb-6">
                <h3>Drop packages</h3>
            </div>
            <div className="flex flex-row">
                <div className="w-1/2 mb-4 pr-10">
                    <h4 className="font-bold mb-4">Packages list</h4>
                    <DropoffLockers />
                </div>
                <div className="w-1/2 mb-4 pl-5">
                    <h4 className="font-bold mb-4">Free cabinets</h4>
                    <FreeCabinets />
                </div>
            </div>
            <div className="mt-20 text-center">
                <Link href="/lockerDetails" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Back</Link>
            </div>
        </div>
    )
};

export default dropoffLockers;