'use client'
import React, { createContext, useEffect, useState } from 'react';
import { getCabinets, getParcels } from './apiRequests';
import { useLockerContext } from './lockerContext';
 

interface DataContextType {
    cabinets: any;
    transportParcels: any;
    freeCabinets: any;
    collectCabients: any;
    occupiedCabients: any;
    selectedParcel: any;
    setSelectedParcel: any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataContextProvider = (props: any) => {
    const [ cabinets, setCabinets ] = useState<any>([]);
    const [ transportParcels, setTransportParcels ] = useState<any>([]);
    const [ selectedParcel, setSelectedParcel ] = useState<any>({});
    const { selectedLocker } = useLockerContext() as any;
    

    useEffect(() => {
        const fetchCabinets = async () => {
            const data = await getCabinets(selectedLocker);
            setCabinets(data);
        };
        fetchCabinets();
    }, [selectedLocker]);

    useEffect(() => {
        const fetchParcels = async () => {
            const data = await getParcels(selectedLocker);
            setTransportParcels(data);
        };
        fetchParcels();
    }, [selectedLocker]);

    const freeCabinets = cabinets.filter((item: any) => item.cabinet_status === 'free');
    const collectCabients = cabinets.filter((item: any) => item.cabinet_status === 'has_dropoff_parcel');
    const occupiedCabients = cabinets.filter((item: any) => item.cabinet_status === 'has_pickup_parcel');

    const value = {
        cabinets,
        transportParcels,
        freeCabinets,
        collectCabients,
        occupiedCabients,
        selectedParcel,
        setSelectedParcel
    };
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );
}

export const useDataContext = () => {
    const context = React.useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
}

export default DataContextProvider;


