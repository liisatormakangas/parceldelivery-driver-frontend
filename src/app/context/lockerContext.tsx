'use client'
import React, { createContext, useState } from 'react';

interface LockerContextType {
    selectedLocker: number;
}

const LockerContext = createContext<LockerContextType | undefined>(undefined);

const LockerContextProvider = (props: any) => {
    const [ selectedLocker, setSelectedLocker ] = useState<number>(0);

    const value = {
        selectedLocker,
        setSelectedLocker
    };
    return (
        <LockerContext.Provider value={value}>
            {props.children}
        </LockerContext.Provider>
    );
} 

export const useLockerContext = () => {
    const context = React.useContext(LockerContext);
    if (context === undefined) {
        throw new Error('useLockerContext must be used within a LockerContextProvider');
    }
    return context;
}

export default LockerContextProvider;