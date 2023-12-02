import React from "react";
import Link from "next/link";
import PickupLockerList from "../components/pickupLockerList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const pickupLockers = () => {

    return (
        <div>
            <Header />
            <div className="ml-7 mr-10">
                <div className="text-2xl font-bold mb-7 mt-7">
                    <h3>Collect packages</h3>
                </div>
                <div className="flex flex-row">
                    <PickupLockerList />
                </div>
                <div className="flex flex-row ">
                    <div className="mt-20 mb-10 text-center">
                        <Link href="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Back to Locker List</Link>
                    </div>
                    <div className="mt-20 mb-10 ml-40 text-center">
                        <Link href="/lockerDetails" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 pl-10 pr-10 rounded">Back</Link>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default pickupLockers;