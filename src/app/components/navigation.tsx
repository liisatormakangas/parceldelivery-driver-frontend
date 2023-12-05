import React from "react";
import Link from "next/link";
import Image from "next/image";
 

const Navigation = () => {
  return (
    <div className="flex flex-row mt-2 mb-1 ps-5">
        <div className="text-center">
            <Link href="/" className="hover:font-bold text-zinc-400 text-lg ps-2 tracking-wide">
            Locker List
            </Link>
        </div>
        <div className="text-center pt-1">
            <Image src="/connect.svg" alt="Connect Icon" className="ml-2 pt-1" width={75} height={50} />
        </div>
        <div className="text-center">
            <Link href="/lockerDetails" className="hover:font-bold text-zinc-400 text-lg ps-2  tracking-wide">
            Locker Details
            </Link>
        </div>
        <div className="text-center pt-1">
            <Image src="/connect.svg" alt="Connect Icon" className="ml-2 pt-1" width={75} height={50} />
        </div>
        <div className="text-center">
            <Link href="/pickupLockers" className="hover:font-bold text-zinc-400 text-lg ps-2  tracking-wide">
            Collect Packages
            </Link>
        </div>
        <div className="text-center pt-1">
            <Image src="/connect.svg" alt="Connect Icon" className="ml-2 pt-1" width={75} height={50} />
        </div>
        <div className="text-center">
            <Link href="/dropoffLockers" className="hover:font-bold text-zinc-400 text-lg ps-2  tracking-wide">
            Drop Packages
            </Link>
        </div>
    </div>
  );
};

export default Navigation;

