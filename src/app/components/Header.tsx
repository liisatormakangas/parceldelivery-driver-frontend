'use client'
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    // Function to update currentDateTime every second
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long' as const,
        day: 'numeric' as const,
        month: 'short' as const,
        hour: '2-digit' as const,
        minute: '2-digit' as const,
      };

      const formattedDateTime = now.toLocaleString('en-US', options);
      setCurrentDateTime(formattedDateTime);
    };

    // Update initially and start a timer to update every second
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-green-600 text-white ">
      <div className="flex items-center">
        {/* <Image src="/logo.png" alt="logo" width={50} height={50} /> */}
        <h1 className="text-2xl font-bold ml-2">Parcel Delivery</h1>
      </div>
      <div className="text-sm">{currentDateTime}</div>
    </header>
  );
};

export default Header;
