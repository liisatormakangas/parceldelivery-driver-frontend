import React from "react";
import Link from "next/link";
import PickupLockerList from "../components/pickupLockerList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/navigation";

const pickupLockers = () => {

    return (
        <div>
            <Header />
            <div className=" p-10 border-solid border-2">
            <Navigation />
            <div className="ml-7 mr-10">
                <div className="text-2xl font-bold mb-7 mt-7">
                    <h3>Collect packages</h3>
                </div>
                <div className="flex flex-row">
                    <PickupLockerList />
                </div>
                <div className="flex flex-row">
                    <div className="mt-20 mb-10 text-center">
                        <Link href="/" className="bg-orange-500 hover:bg-orange-700  text-white font-bold py-2 px-4 rounded">Back to Locker List</Link>
                    </div>
                    <div className="mt-20 mb-10 text-center ml-auto">
                        <Link href="/lockerDetails" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                    </div>
                </div>

            </div>
            </div>
            <Footer />
        </div>
    )
}

export default pickupLockers;