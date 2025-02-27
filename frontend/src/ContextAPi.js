"use client";
import { ethers, providers } from "ethers";
import React, { createContext, useContext } from "react";
import { Abi, Address } from "./Configuration/Contract";
export const ContextAPI = createContext(null);

export const useContextAPI = () => {
  return useContext(ContextAPI);
};

export const ContextProvider = ({ children }) => {
  let provider;
  if (typeof window !== "undefined") {
    if (typeof window.ethereum !== "undefined") {
      provider = new ethers.providers.Web3Provider(window.ethereum).getSigner();
    } else {
      console.log("MetaMask is not installed");
    }
  } else {
    console.log("!provider");
  }

  var Contract = new ethers.Contract(Address, Abi, provider);

  return (
    <ContextAPI.Provider value={{ provider, Contract }}>
      {children}
    </ContextAPI.Provider>
  );
};
