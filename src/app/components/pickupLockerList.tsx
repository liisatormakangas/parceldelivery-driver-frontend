'use client';
import React, { useEffect, useState } from "react";
import '../globals.css';
import { useLockerContext } from "../context/lockerContext";
import { getCabinets } from '../context/apiRequests';

interface LockerContextType {
    selectedLocker: number;
    selectedCabinet: number;
}

interface CabinetType {
    id_cabinet: number;
    cabinet_number: number;
    locker_number: number;
    cabinet_status: string;
    parcel_id: number;
};

const notification = () => {
    return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Be Warned</p>
            <p>Something not ideal might be happening.</p>
        </div>
    )
}

const PickupLockers = () => {
    const { selectedLocker } = useLockerContext() as LockerContextType;
    const [selectedCabinet, setSelectedCabinet] = useState(0);
    const [selectedParcel, setSelectedParcel] = useState(0);
    const [cabinetOpen, setCabinetOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Open cabinet');
    const [collectCabs, setCollectCabs] = useState([]);

    useEffect(() => {
        const cabinets = async () => {
            const response = await getCabinets(selectedLocker);
            setCollectCabs(response.filter((item: CabinetType) => item.cabinet_status === 'has_dropoff_parcel'));
        };
        cabinets();
    }
        , [selectedLocker]);

    const handleListElement = (e: any, cabinetId: number, parcelId: number) => {
        e.preventDefault();
        setSelectedCabinet(cabinetId);
        setSelectedParcel(parcelId);
    }

    const handleCabinetDoor = async (e: any) => {
        e.preventDefault();

        { cabinetOpen ? setButtonText('Close cabinet') : setButtonText('Open cabinet') }

        if (selectedCabinet !== 0 && selectedParcel !== 0) {
            cabinetOpen ? setCabinetOpen(false) : setCabinetOpen(true);

            try {
                const requestOptionsCabinet = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_cabinet: selectedCabinet })
                };

                const requestOptionsParcel = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_parcel: selectedParcel })
                };

                const [responseCabinet, responseParcel] = await Promise.all([
                    fetch('http://localhost:3001/cabinet/freeCabinet', requestOptionsCabinet),
                    fetch('http://localhost:3001/parcel/modifyParcelToTransport', requestOptionsParcel)
                ]);

                const dataCabinet: any = await responseCabinet.json();
                const dataParcel: any = await responseParcel.json();

                alert(dataCabinet.message);
                alert(dataParcel.message);

            }
            catch (error) {
                console.log(error);
            };

            const updatedCabients = collectCabs.filter((item: any) => item.id_cabinet !== selectedCabinet);
            setCollectCabs(updatedCabients);
            setCabinetOpen(false);
            setSelectedCabinet(0);
            setSelectedParcel(0);
            setButtonText('Close cabinet');

        } else {
            alert('Please select a cabinet');
        }
    };

    const parcelList = collectCabs.map((cab: CabinetType) => {
        const isSelected = cab.id_cabinet === selectedCabinet;
        return (
            <div key={cab.id_cabinet} onClick={(e) => handleListElement(e, cab.id_cabinet, cab.parcel_id)}
                className={`grid grid-cols-2 pt-2 pb-2 pl-2 ${isSelected ? 'selected-row' : ''}`}
            >
                <h5>Parcel ID: {cab.parcel_id}</h5>
                <h5>L{cab.locker_number}: cabinet <strong>{cab.cabinet_number}</strong></h5>
            </div>

        )
    })
    return (
        <>
            <div className="w-3/5 mb-4 pr-10">
                {collectCabs.length === 0 ?
                    <h4 className="font-bold mb-4">No packages to collect</h4>
                    : <h4 className="font-bold mb-4">Select a cabinet and parcel</h4>}
                {parcelList}
            </div>
            <div className="w-2/5 mt-10 mb-4 pl-5">
                <button onClick={(e) => handleCabinetDoor(e)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    {buttonText}
                </button>

            </div>
        </>
    )
};

export default PickupLockers;