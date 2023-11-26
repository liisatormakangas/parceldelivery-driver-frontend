import React from "react";

const url = "http://localhost:3001";

export const getCabinets = async (lockerNumber: number) => {
    const response = await fetch(`${url}/cabinet/allCabinets/${lockerNumber}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
};
export const getParcels = async (lockerNumber: number) => {
    const response = await fetch(`${url}/parcel/transportParcels/${lockerNumber}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
};