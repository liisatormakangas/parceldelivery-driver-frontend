'use client';
import React, { useEffect, useState } from "react";
import { useLockerContext } from "../context/lockerContext";
import { getParcels, getCabinets, getFreeLockers } from "../context/apiRequests";
import '../globals.css';

interface LockerContextType {
  selectedLocker: number;
}
interface ParcelType {
  id_parcel: number;
  parcel_status: string;
}
interface CabinetType {
    id_cabinet: number;
    cabinet_number: number;
    locker_number: number;
    cabinet_status: string;
    parcel_id: number;
    };
   
const DropoffLockers = () => {
  const { selectedLocker } = useLockerContext() as LockerContextType;

  const [parcels, setParcels] = useState<number[]>([]);
  const [selectedParcelId, setSelectedParcelId] = useState<number | null>(null);

  const [showAvailableCabinets, setShowAvailableCabinets] = useState(false);
  const [freeCabinets, setFreeCabinets] = useState<CabinetType[]>([]);
  const [selectedCabinetId, setSelectedCabinetId] = useState<number | null>(null);
  const [selectedCabinet, setSelectedCabinet] = useState<number | null>(null);

  const [showAvailableLockers, setShowAvailableLockers] = useState(false);
  const [freeLockers, setFreeLockers] = useState<CabinetType[]>([]);
  const [selectedLockerNumber, setSelectedLockerNumber] = useState<number | null>(null);

  const [droppedOffParcels, setDroppedOffParcels] = useState<number[]>([]);
  const [droppedOffCabinets, setDroppedOffCabinets] = useState<number[]>([]);

    const handleConfirm = async () => {
      if (selectedParcelId !==0 && selectedLockerNumber !==0) {
        try {
          const requestLocker = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parcelId: selectedParcelId, lockerNumber: selectedLockerNumber })
          };
          const response = await fetch(`http://localhost:3001/parcel/updateParcelWithNewLocker`, requestLocker);
          const data:any = await response.json();
          setShowAvailableLockers(false);
          setShowAvailableCabinets(false);
          alert('Pickup Locker changed successfully');
          
        } catch (error:any) {
          console.error("Error updating pickup locker:", error.message);
        }
      }
    };
    const handleCabinetDoor = async () => {
      try {
        if (selectedParcelId && selectedCabinetId) {
          console.log('Request Payload:', { id_cabinet: selectedCabinetId, id_parcel: selectedParcelId });
          const requestCabinet = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parcelId: selectedParcelId,selectedCabinet: selectedCabinetId,  }),
          };
    
          const response = await fetch(`http://localhost:3001/parcel/modifyAfterDriverDropoff`, requestCabinet);
          console.log('Response:', response);
          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
          }
          setShowAvailableCabinets(false);
          alert('Parcel dropped off successfully');
        }
      } catch (error:any) {
        console.error("Error updating cabinet:", error.message);
      }
    };
    
  
    useEffect(() => {
      const fetchParcelsAndCabinets = async () => {
        try {
          const parcelData = await getParcels(selectedLocker);
          setParcels(parcelData);
    
          const cabinetData = await getCabinets(selectedLocker);
          setFreeCabinets(cabinetData.filter((item: CabinetType) => item.cabinet_status === 'free'));
    
          const lockerData = await getFreeLockers();
          setFreeLockers(lockerData);

          // Update dropped-off parcels and cabinets based on the response from the server
          const updatedDroppedOffParcels = droppedOffParcels.filter((parcelId) => {
            const isDroppedOff = parcelData.some((parcel:any) => parcel.id_parcel === parcelId);
            return !isDroppedOff;
          });
          setDroppedOffParcels(updatedDroppedOffParcels);
          const updatedDroppedOffCabinets = droppedOffCabinets.filter((cabinetId) => {
            const isDroppedOff = cabinetData.some((cabinet:any) => cabinet.id_cabinet === cabinetId);
            return !isDroppedOff;
          });
          setDroppedOffCabinets(updatedDroppedOffCabinets);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchParcelsAndCabinets();
    }, [selectedLocker, droppedOffParcels, droppedOffCabinets]);
  
    const cabinetList = (
      <div className="grid grid-cols-3 gap-4">
        {freeCabinets.map((cabinet: CabinetType) => {
          const isSelected = cabinet.id_cabinet === selectedCabinetId;
    
          // Exclude dropped-off cabinets
          if (!droppedOffCabinets.includes(cabinet.id_cabinet)) {
            return (
              <div
                key={cabinet.id_cabinet}
                onClick={(e: any) => {
                  e.preventDefault();
                  setSelectedCabinetId(cabinet.id_cabinet);
                  setSelectedCabinet(cabinet.cabinet_number);
                  console.log(`Selected Cabinet number: ${cabinet.cabinet_number}`);
                }}
                className={`pt-2 pb-2 pl-2 ${isSelected ? 'selected-row' : ''}`}
              >
                <h5>L{cabinet.locker_number}: cabinet {cabinet.cabinet_number}</h5>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
    
  
    const lockerList = freeLockers.map((cabinet: CabinetType) => {
        const isSelected = cabinet.locker_number === selectedLockerNumber;
        return (
          <div
            key={cabinet.locker_number}
            onClick={(e: any) => {
              e.preventDefault();
              setSelectedLockerNumber(cabinet.locker_number);
              console.log(`Selected Locker number: ${cabinet.locker_number}`);
            }}
            className={`grid grid-cols-2 pt-2 pb-2 pl-2 ${isSelected ? 'selected-row' : ''}`}
          >
            <h5>Locker Number: {cabinet.locker_number}</h5>
          </div>
        );
      });

    // Handler function to update selectedParcelId
    const handleParcelSelection = (parcelId:number) => {
      console.log('Setting selectedParcelId:', parcelId);
      setSelectedParcelId(parcelId);
    };

    const parcelList = parcels.map((parcelId) => {
      if (!droppedOffParcels.includes(parcelId)) {
        return (
          <div
            key={parcelId}
            onClick={() => {
              setSelectedParcelId(parcelId);
              handleParcelSelection(parcelId);
              setShowAvailableCabinets(true);
              setShowAvailableLockers(freeCabinets.length === 0);
              console.log(`Selected Parcel ID: ${parcelId}`);
            }}
            className={`grid grid-cols-2 pt-2 pb-2 pl-2 ${parcelId === selectedParcelId ? 'selected-row' : ''}`}
          >
            <h5>Parcel ID: {parcelId}</h5>
          </div>
        );
      }
      return null;
    });
    return (
      <>
        <div className="w-1/2 mb-4 pr-10">
          {parcels.length === 0 ? (
            <h4 className="font-bold mb-4">No packages to collect</h4>
          ) : (
            <h4 className="font-bold mb-4">Select a parcel</h4>
          )}
          {parcelList}
        </div>
        {showAvailableCabinets && (
          <div className="w-1/2 mb-4 pl-5">
            <h4 className="font-bold mb-4">
              {showAvailableLockers
                ? "No available cabinets. Select an alternative locker"
                : "Select a cabinet"}
            </h4>
          {showAvailableLockers ? lockerList : cabinetList}

            {(selectedLockerNumber || selectedCabinetId) && (
                <button
                  onClick={showAvailableLockers ? handleConfirm : handleCabinetDoor}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {showAvailableLockers ? "Confirm Locker" : "Confirm Cabinet"}
                </button>
      )}
      </div>
    )}
      </>
    );
  };
  
  export default DropoffLockers;