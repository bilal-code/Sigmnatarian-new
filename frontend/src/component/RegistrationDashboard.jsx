"use client";

import {
  ConnectWallet,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { MatrixAddress, MatrixAbi, AddressZero } from "./Constants";

import { ThirdwebSDK, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState } from "react";

const RegistrationDashboard = ({ viewHandler }) => {
  const [val, setVal] = useState("");

  const address = useAddress();
  const { contract } = useContract(MatrixAddress, MatrixAbi);

  const { data: isUserExists } = useContractRead(contract, "isUserExists", [
    ethers.utils.isAddress(address) ? address : AddressZero,
  ]);
  const { data: LastIdUser, isLoading: LastIdUserIsLoading } = useContractRead(
    contract,
    "LastIdUser"
  );
  console.log("LastIdUser", LastIdUser);

  return (
    <div className="grid grid-cols-1 md:flex gap-5 justify-center bg-[#67288e] py-10 px-4  md:px-0">
      <div className="flex flex-col flex-wrap justify-center items-center text-center gap-2 md:gap-10 border-t-4 border-b-4 border-l-4 w-full md:w-[40%] md:my-10 py-10 rounded-lg text-white px-3">
        <h1 className="text-lg md:text-3xl font-semibold text-[#caa8f5]">
          Login To Your Personal Account
        </h1>
        <p className="text-md md:text-xl">
          For access to all the functions of your personal account use automatic
          login
        </p>
        <div>
          {address ? (
            <a
              href="/wallet-registration"
              class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-purple-500 rounded-xl group"
            >
              <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-purple-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Register
              </span>
            </a>
          ) : (
            <ConnectWallet className="inline-block w-full  cursor-pointer rounded-3xl bg-[#9064b2] p-[10px] text-[12px]  font-normal leading-[20px] text-white sm:p-[15px] sm:text-[15px] md:w-[60%]" />
          )}
        </div>
      </div>

      <div className="hidden md:block h-80 border mt-10"></div>

      <div className="flex flex-col flex-wrap justify-center items-center text-center gap-2 border-t-4 border-b-4 border-r-4 w-full md:w-[40%] md:my-10 py-10 rounded-lg text-white">
        <h1 className="text-lg md:text-3xl md:mb-[70px]   font-semibold text-[#caa8f5]">
          To View Your Account Specify ID
        </h1>

        <div className="flex items-center justify-center flex-col gap-4">
          <input
            type="text"
            placeholder="ID:"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              setUserIdHandler(e.target.value);
            }}
            className="border w-[70%] md:w-60 px-6 py-1 md:py-3 text-gray-500 rounded-full"
          />

          <div>
            <div
              onClick={() => viewHandler(val)}
              class="relative w-full md:w-60 inline-flex items-center justify-center p-4 px-6 py-1 md:py-3 overflow-hidden font-medium text-[#caa8f5] transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
            >
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <div className="flex justify-center items-center">
                <span class="absolute flex items-center justify-center w-full h-full text-[#caa8f5] transition-all duration-300 transform group-hover:translate-x-full ease">
                  Viewing
                </span>
                <span class="relative invisible"> Viewing-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDashboard;
