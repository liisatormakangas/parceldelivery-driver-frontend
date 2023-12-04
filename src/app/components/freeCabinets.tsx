'use client';
import React, { useEffect, useState } from "react";
import { useLockerContext } from "../context/lockerContext";
import { getCabinets } from '../context/apiRequests';


interface CabinetType {
    id_cabinet: number;
    cabinet_number: number;
    locker_number: number;
    cabinet_status: string;
    parcel_id: number;
};
interface LockerContextType {
    selectedLocker: number;
    selectedCabinet: number;
};
interface FreeCabinetsProps {
    onSelectCabinet: (selectedCabinet: number) => void;
  }

const FreeCabinets: React.FC<FreeCabinetsProps> = ({ onSelectCabinet }) => {
    const { selectedLocker} = useLockerContext() as LockerContextType;
    const [freeCabinets, setFreeCabinets] = useState([]);
    const [selectedCabinetId, setSelectedCabinetId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCabinets = async () => {
          try {
            const response = await getCabinets(selectedLocker);
            setFreeCabinets(response.filter((item: CabinetType) => item.cabinet_status === 'free'));
          } catch (error) {
            console.error('Error fetching cabinets:', error);
          }
        };
        fetchCabinets();
      }, [selectedLocker]);

    const handleCabinet = (selectedCabinet: number) => {
        // Call the parent component's callback function with the selected cabinet
        onSelectCabinet(selectedCabinet);
      };

      const cabinetList = freeCabinets.map((cabinet: CabinetType) => {
        const isSelected = cabinet.id_cabinet === selectedCabinetId;

        return(
        <div
          key={cabinet.id_cabinet}
          onClick={() => handleCabinet(cabinet.id_cabinet)}
          className={`grid grid-cols-2 pt-2 pb-2 pl-2 ${isSelected ? 'selected-row' : ''}`}
        >
          <h5>L{cabinet.locker_number}: cabinet {cabinet.cabinet_number}</h5>
        </div>
      )
});
    
      return (
        <div className="w-2/5 mb-4 pl-5">
          <h4 className="font-bold mb-4">Select a cabinet</h4>
          {cabinetList}
        </div>
      );
    };
    
    export default FreeCabinets;