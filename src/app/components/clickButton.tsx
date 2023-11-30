'use client'
import React from 'react';
import { useLockerContext } from '../context/lockerContext';
import { useDataContext } from '../context/dataContext';


const Button = () => {
    const { selectedCabinet, setSelectedCabinet } = useLockerContext() as any;
    const { selectedParcel, setSelectedParcel } = useDataContext() as any;

    const [cabinetIsOpen, setCabinetIsOpen] = React.useState(false);

    const handleClick = async (e: any) => {
        e.preventDefault();
        setCabinetIsOpen(!cabinetIsOpen);

        if (cabinetIsOpen && selectedCabinet !== 0 && selectedParcel !== 0) {
            console.log(cabinetIsOpen)
            console.log(selectedCabinet)
            console.log(selectedParcel)
            // try {
            //     const requestOptionsCabinet = {
            //         method: 'PUT',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ id_cabinet: selectedCabinet })
            //     };

            //     const requestOptionsParcel = {
            //         method: 'PUT',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ parcel_id: selectedParcel })
            //     };

            //     // Use Promise.all to wait for both requests to complete
            //     const [responseCabinet, responseParcel] = await Promise.all([
            //         fetch('http://localhost:3001/cabinet/freeCabinet', requestOptionsCabinet),
            //         fetch('http://localhost:3001/parcel/updateParcel', requestOptionsParcel)
            //     ]);

            //     const dataCabinet = await responseCabinet.json();
            //     const dataParcel = await responseParcel.json();

            //     console.log('Response from Cabinet:', dataCabinet);
            //     console.log('Response from Parcel:', dataParcel);
            // }
            // catch (error) {
            //     console.log(error);
            // }
        } else {
            setSelectedCabinet(0);
            setSelectedParcel(0);
        }
    }

    return (
        <div>
            <button onClick={(e) => handleClick(e)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {cabinetIsOpen ? 'Close Cabinet' : 'Open Cabinet'}
            </button>
        </div>
    )
}


export default Button;