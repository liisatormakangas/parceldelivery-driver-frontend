import React from "react";
import Link from "next/link";
import PickupLockerList from "../components/pickupLockerList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/clickButton";

const pickupLockers = () => {

    return (
        <div>
            <Header />
            <div className="ml-7 mr-10">
                <div className="text-2xl font-bold mb-7 mt-7">
                    <h3>Collect packages</h3>
                </div>
                <div className="flex flex-row">
                    <div className="w-3/5 mb-4 pr-10">
                        <h4 className="font-bold mb-4">Packages list</h4>
                        <PickupLockerList />
                    </div>
                    <div className="w-2/5 mt-10 mb-4 pl-5">
                        <Button />
                    </div>
                </div>
                <div className="mt-20 mb-10 text-center">
                    <Link href="/lockerDetails" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 pl-10 pr-10 rounded">Back</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default pickupLockers;