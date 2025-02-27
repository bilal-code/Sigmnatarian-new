"use client";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { MatrixAbi, MatrixAddress } from "./Constants";
import { UseFormatEtherNumber, UseFormatNumber } from "../lib/utils/useEthers";
import { useEffect, useState } from "react";
import axios from "axios";

const WalletDashboardHeading = ({ id }) => {
  // const address = useAddress();
  const { contract: MatrixContract } = useContract(MatrixAddress, MatrixAbi);
  let { data: totalUsers, isLoading } = useContractRead(
    MatrixContract,
    "LastIdUser"
  );
  const { data: address, isAddressLoading } = useContractRead(
    MatrixContract,
    "IdToAddress",
    [id]
  );
  const { data: user, isUserLoading } = useContractRead(
    MatrixContract,
    "user",
    [address]
  );
  totalUsers = UseFormatNumber(totalUsers && totalUsers[0]);
  const TotalEarnings = UseFormatEtherNumber(totalUsers && totalUsers[1]);

  const [eventDataFromDb, setEventDataFromDb] = useState([]);
  console.log("eventDataFromDb------>", eventDataFromDb);
  useEffect(() => {
    let allData;
    axios
      .get("https://check-back.vercel.app/user/getUserData/")
      .then((res) => {
        allData = res.data.users.filter((i) => i.userId === id);
        setEventDataFromDb(allData);
      })
      .catch((error) => {
        console.log("error--->", error);
      });
  }, []);

  return (
    <div className="bg-[#3f054f] text-center text-[#caa8f5]">
      <h2 className="text-center pt-8 px-4 font-semibold">
        Advertisement bonus coming soon...
      </h2>
      <div className="flex flex-wrap justify-center items-center  text-xl gap-10 max-w-6xl mx-auto pt-10 pb-14 px-14 ">
        <div className=" border p-6 rounded-xl flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-semibold">
            {" "}
            ALL PARTICIPANTS{" "}
          </h1>
          <h1 className="text-yellow-200">
            {" "}
            {totalUsers === 0 ? 0 : totalUsers - 1}
          </h1>
        </div>

        <div className=" border  p-6 rounded-xl flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-semibold uppercase">
            {" "}
            TOTAL PlateForm EARNING{" "}
          </h1>
          <h1 className="text-yellow-200">{TotalEarnings}</h1>
        </div>
        <div className=" border  p-6 rounded-xl flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-semibold">Your ID number</h1>

          <h1 className="text-yellow-200">{eventDataFromDb[0]?.userId}</h1>
        </div>
      </div>
    </div>
  );
};
export default WalletDashboardHeading;
