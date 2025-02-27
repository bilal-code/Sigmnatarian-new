"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { UseFormatEtherNumber } from "../lib/utils/useEthers";
import {
  ThirdwebSDK,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import {
  ActiveChain,
  DiaAbi,
  DiaAddress,
  MatrixAbi,
  MatrixAddress,
} from "./Constants";
import axios from "axios";
import Link from "next/link";

const WalletDashboardMain = ({ id }) => {
  const [btnType, setBtnType] = useState("Approve");
  const { contract: MatrixContract } = useContract(MatrixAddress, MatrixAbi);
  const { contract: DiaContract } = useContract(DiaAddress, DiaAbi);
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
  const { data: address, isLoading } = useContractRead(
    MatrixContract,
    "IdToAddress",
    [id]
  );

  // Functions
  const { data: user, isLoading: usersIsLoading } = useContractRead(
    MatrixContract,
    "user",
    [address]
  );
  const { mutateAsync: approve, isLoading: approveIsLoading } =
    useContractWrite(DiaContract, "approve");
  const { mutateAsync: claimReward, isLoading: claimRewardIsLoading } =
    useContractWrite(MatrixContract, "ClaimReward");
  const { mutateAsync: upgrade, isLoading: upgradeIsLoading } =
    useContractWrite(MatrixContract, "Upgrade");
  const { data: balance, isLoading: balanceIsLoading } = useContractRead(
    MatrixContract,
    "balanceOf",
    [address]
  );
  const { data: buyLevelPrice, isLoading: byLevelPriceLoading } =
    useContractRead(MatrixContract, "buyLevelPrice");

  const clickClaimReward = async () => {
    try {
      const data = await claimReward({
        args: [address],
      });
      console.log("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const checkUSer1 = parseInt(Number(user && user[0]));
  const checkUSer2 = parseInt(Number(user && user[1]));
  const checkUSer3 = parseInt(Number(user && user[2]));
  const checkUSer4 = parseInt(Number(user && user[3]));
  const checkUSer5 = parseInt(Number(user && user[4]));
  console.log("checkUSer1------c---", checkUSer1);

  const currentUsers2 = parseInt(Number(user && user[2]));
  const callApprove = async () => {
    if (btnType === "Approve") {
      try {
        const data = await approve({
          args: [MatrixAddress, buyLevelPrice[currentUsers2 + 1]],
        });
        console.info("contract call success", data);
        setBtnType("upgrade");
      } catch (err) {
        console.error("contract call failure", err);
      }
    } else {
      try {
        const data = await upgrade({
          args: [address],
        });
        console.log("contract call success", data);
        setBtnType("Approve");
      } catch (err) {
        console.error("contract call failure", err);
      }
    }
  };
  const [copied, setCopied] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const [copied3, setCopied3] = useState(false);

  const NFt = UseFormatEtherNumber(balance);
  const handleCopy = () => {
    const linkToCopy =
      "https://sigmantarian.com/wallet-dashboard?uid=" +
      eventDataFromDb[0]?.userId;
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true);
  };
  const handleCopy2 = (data) => {
    const linkToCopy2 = data;
    navigator.clipboard.writeText(linkToCopy2);
    setCopied2(true);
  };
  const handleCopy3 = () => {
    const linkToCopy = "https://geniosclub.team/auth/register?ref=1";
    navigator.clipboard.writeText(linkToCopy);
    setCopied3(true);
  };
  return (
    <div className=" flex flex-col gap-5 px-4">
      <div className="flex flex-col gap-5  border p-5 rounded-2xl bg-[#67288e] text-[#caa8f5]">
        <ul className="flex justify-between">
          <li className="text-xl font-bold">TOTAL EARNING:</li>
          <li>{parseInt(Number(user && user[1])) / 1000000000000000000}</li>
        </ul>
        <ul className="flex justify-between">
          <li className="text-xl font-bold">ACTIVE LEVEL</li>
          <li>
            {parseInt(Number(user && user[2])) === 1
              ? "Silver"
              : parseInt(Number(user && user[2])) === 2
              ? "Gold"
              : parseInt(Number(user && user[2])) === 3
              ? "Diamond"
              : parseInt(Number(user && user[2])) === 4
              ? "Platinum"
              : "NO"}
          </li>
        </ul>

        <ul className="flex justify-between">
          <li className="text-xl font-bold">NFT</li>
          <li>{NFt}</li>
        </ul>

        <ul className="flex flex-col justify-between">
          <li className="text-xl font-bold"> Affiliate link</li>
          <li>
            <div className="flex items-center justify-between space-x-4 border w-full p-1">
              <a
                href="0x93a33efC878C6Ee5E8960B47Eb93f4296288b978"
                className="text-gray-500 hover:underline"
              >
                {`https://sigmantarian....?uid=${eventDataFromDb[0]?.userId}`}
              </a>
              <button
                onClick={() => handleCopy(address)}
                className="flex items-center justify-center bg-purple-500 text-white rounded-full h-8 w-8 focus:outline-none"
              >
                {copied ? <TiTick /> : <FiCopy />}
              </button>
            </div>
          </li>{" "}
        </ul>
        <ul className="flex flex-col justify-between">
          <li className="text-xl font-bold">WALLET ADDRESS</li>
          <li>
            <div className="flex items-center justify-between  border  md:w-full p-1">
              <a
                href="0x93a33efC878C6Ee5E8960B47Eb93f4296288b978"
                className="text-gray-500 hover:underline"
              >
                {address?.slice(0, 9)} ........ {address?.slice(-7)}
              </a>
              <button
                onClick={() => handleCopy2(address)}
                className="flex items-center justify-center bg-purple-500 text-white rounded-full h-8 w-8 focus:outline-none"
              >
                {copied2 ? <TiTick /> : <FiCopy />}
              </button>
            </div>
          </li>{" "}
        </ul>
        <ul className="flex flex-col justify-between">
          <li className="text-xl font-bold">MY UPLINE</li>
          <li>
            <div className="flex justify-between items-center space-x-4 w-full border p-1 ">
              <a href="8" className="text-gray-200 hover:underline">
                {eventDataFromDb[0]?.refId}
              </a>
              <button
                onClick={handleCopy3}
                className="flex items-center justify-center bg-purple-500 text-white rounded-full h-8 w-8 focus:outline-none"
              >
                {copied3 ? <TiTick /> : <FiCopy />}
              </button>
            </div>
          </li>{" "}
        </ul>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button
          onClick={clickClaimReward}
          className="bg-purple-800 md:col-span-2 rounded-lg border md:px-3 md:py-2 px-4 py-3 text-white font-semibold text-xs md:text-base"
        >
          Claim Rewards
        </button>

        <button
          onClick={callApprove}
          className="bg-purple-800 rounded-lg border md:px-3 md:py-2 px-4 py-3 text-white font-semibold text-xs md:text-base"
        >
          {currentUsers2 == 4 ? "You are Upgraded" : btnType}
        </button>
      </div>
      <Link
        href="https://discord.gg/WfPyvAr6"
        // onClick={statisticsHandler}
        className="bg-purple-800  border  text-center px-2 py-[8px] text-white font-semibold md:text-lg rounded-lg"
      >
        Generate Add Rewards{" "}
      </Link>{" "}
    </div>
  );
};
export default WalletDashboardMain;
