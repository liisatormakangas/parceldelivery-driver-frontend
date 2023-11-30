'use client'
import Link from "next/link";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LockerName from "../components/lockerName";
import CollectCabients from "../components/collectCabinets";
import TransportParcels from "../components/transportParcels";
import FreeAndOccupCabinets from "../components/freeAndOccupCabinets";
import AvailableCabients from "../components/availableCabinets";


const LockerDetails = () => {
    // use locker number from query http://localhost:3000/lockerDetails?lockerNumber=2
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    
    // Get the value of the 'lockerNumber' parameter
    const lockerNumber = urlParams.get('lockerNumber');
    console.log("details  " + lockerNumber)

    return (
        <div>
            <Header />
            <div className="ml-7 mr-10">
                <LockerName locker={lockerNumber}/>
                <div className="flex">
                    <div className="w-3/5 pr-20">
                        <div className="font-bold mb-3 mt-3">
                            <h3>Package Information</h3>
                        </div>
                        <div className="package flex flex-row justify-between items-start pt-5">
                            <div>
                                <h5>Packages to collect from locker:</h5>
                            </div>
                            <CollectCabients />
                            <div>
                                <Link href="/pickupLockers" className="text-green-500 underline font-bold">Proceed</Link>
                            </div>
                        </div>
                        <div className="package flex flex-row justify-between items-start pt-5">
                            <div>
                                <h5>Packages to leave to locker:</h5>
                            </div>
                            <TransportParcels />
                            <div>
                                <Link href="/dropoffLockers" className="text-green-500 underline font-bold">Proceed</Link>
                            </div>
                        </div>
                        <AvailableCabients />
                    </div>
                    <div className="w-2/5">
                        <div className="font-bold mb-3 mt-3">
                            <h3>Locker Information</h3>
                        </div>
                        <FreeAndOccupCabinets />
                    </div>
                </div>
                <div className="mt-20 mb-10 text-center">
                    <Link href="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Back to Locker List</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default LockerDetails;