'use client';
import React, { useEffect, useState } from "react";
import { useLockerContext } from "../context/lockerContext";
import { getParcels, modifyAfterDriverDropoff, getCabinets, getFreeLockers } from "../context/apiRequests";
import '../globals.css';

interface LockerContextType {
  selectedLocker: number;
}
interface ParcelType {
  id_parcel: number;
  desired_pickup_locker: number;
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
  
    const [selectedParcelId, setSelectedParcelId] = useState<number | null>(null);
    const [selectedParcel, setSelectedParcel] = useState<ParcelType[]>([]);
    
    const [showAvailableCabinets, setShowAvailableCabinets] = useState(false);
    const [freeCabinets, setFreeCabinets] = useState<CabinetType[]>([]);
    const [selectedCabinetId, setSelectedCabinetId] = useState<number | null>(null);
    const [selectedCabinet, setSelectedCabinet] = useState<number | null>(null);
  
    const [showAvailableLockers, setShowAvailableLockers] = useState(false);
    const [freeLockers, setFreeLockers] = useState<CabinetType[]>([]);
    const [selectedLockerNumber, setSelectedLockerNumber] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchParcelsAndCabinets = async () => {
        try {
          const parcelData = await getParcels(selectedLocker);
          setSelectedParcel(parcelData);
  
          const cabinetData = await getCabinets(selectedLocker);
          setFreeCabinets(cabinetData.filter((item: CabinetType) => item.cabinet_status === 'free'));
  
          const lockerData = await getFreeLockers();
          setFreeLockers(lockerData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchParcelsAndCabinets();
    }, [selectedLocker]);
  
    const cabinetList = freeCabinets.map((cabinet: CabinetType) => {
      const isSelected = cabinet.id_cabinet === selectedCabinetId;
  
      return (
        <div
          key={cabinet.id_cabinet}
          onClick={(e: any) => {
            e.preventDefault();
            setSelectedCabinetId(cabinet.id_cabinet);
            setSelectedCabinet(cabinet.cabinet_number);
            console.log(`Selected Cabinet number: ${cabinet.cabinet_number}`);
          }}
          className={`grid grid-cols-2 pt-2 pb-2 pl-2 ${isSelected ? 'selected-row' : ''}`}
        >
          <h5>L{cabinet.locker_number}: cabinet {cabinet.cabinet_number}</h5>
        </div>
      );
    });
  
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
  
    const parcelList = selectedParcel.map((parcel: ParcelType) => {
      const isSelected = parcel.id_parcel === selectedParcelId;
      console.log(`Parcel ID: ${parcel.id_parcel}`);
  
      return (
        <div
          key={parcel.id_parcel}
          onClick={(e: any) =>  {
            e.preventDefault();
            setSelectedParcelId(parcel.id_parcel);
            setShowAvailableCabinets(true);
            setShowAvailableLockers(freeCabinets.length === 0); 
            console.log(`Selected Parcel ID: ${parcel.id_parcel}`);
        }}
          className={`grid grid-cols-2 pt-2 pb-2 pl-2 ${isSelected ? 'selected-row' : ''}`}
        >
          <h5>Parcel ID: {parcel.id_parcel}</h5>
        </div>
      );
    });
  
    return (
      <>
        <div className="w-1/2 mb-4 pr-10">
          {selectedParcel.length === 0 ? (
            <h4 className="font-bold mb-4">No packages to collect</h4>
          ) : (
            <h4 className="font-bold mb-4">Select a parcel</h4>
          )}
          {parcelList}
        </div>
        {showAvailableCabinets && (
          <div className="w-1/2 mb-4 pl-5">
            <h4 className="font-bold mb-4">{showAvailableLockers ? "No available cabinets. Select an alternative locker" : "Select a cabinet"}</h4>
            {showAvailableLockers ? lockerList : cabinetList}
          </div>
        )}
      </>
    );
  };
  
  export default DropoffLockers;
  