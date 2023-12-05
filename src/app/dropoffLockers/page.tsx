import React from "react";
import DropoffLockers from "../components/dropoffLocerList";
import FreeCabinets from "../components/freeCabinets";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/navigation";


const dropoffLockers = () => {
  return (
    <div>
    <Header />
    <div className=" p-10 border-solid border-2">
    <Navigation />
    <div className="ml-7 mr-10 pt-3">
      <div className="text-2xl font-bold mb-6">
        <h3>Drop packages</h3>
      </div>
      <div className="flex flex-row">
          <DropoffLockers />
        </div>
        
        <div className="flex flex-row">
          <div className="mt-20 mb-10 text-center">
            <Link href="/" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Back to Locker List</Link>
          </div>
          <div className="mt-20 mb-10 text-center ml-auto">
            <Link href="/lockerDetails" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Back</Link>
          </div>
        </div>


            </div>
            </div>
            <Footer />
        </div>
  );
};

export default dropoffLockers;
