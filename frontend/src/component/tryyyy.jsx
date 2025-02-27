"use client";
import { useEffect, useState } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { MatrixAbi, MatrixAddress } from "./Constants";
import axios from "axios";

const ScrollableDiv = ({ id }) => {
  const [eventData1, setEventData1] = useState([]);
  const [eventData2, setEventData2] = useState([]);
  const [eventData3, setEventData3] = useState([]);
  const [eventData4, setEventData4] = useState([]);
  const [eventData5, setEventData5] = useState([]);
  const [eventData6, setEventData6] = useState([]);
  const [eventData7, setEventData7] = useState([]);
  const [eventData8, setEventData8] = useState([]);
  const [eventData9, setEventData9] = useState([]);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  const [number5, setNumber5] = useState(0);
  const [number6, setNumber6] = useState(0);
  const [number7, setNumber7] = useState(0);
  const [number8, setNumber8] = useState(0);
  const [number9, setNumber9] = useState(0);
  let allData;
  let allData1;
  let allData2;
  let allData3;
  let allData4;
  let allData5;
  let allData6;
  let allData7;
  let allData8;
  let allData9;
  const [eventDataFromDb, setEventDataFromDb] = useState([]);

  useEffect(() => {
    axios
      .get("https://check-back.vercel.app/user/getUserData/")
      .then((res) => {
        allData = res.data.users.filter((i) => i.refId === id);
        setEventDataFromDb(allData);
        console.log("eventDataFromDb----->", eventDataFromDb);
        // allData1
        allData1 = res.data.users.filter(
          (i) => i.refId === eventDataFromDb[number1]?.userId
        );
        setEventData1(allData1);
        console.log("eventData1----->", eventData1);
        // allData2
        allData2 = res.data.users.filter(
          (i) => i.refId === eventData1[number2]?.userId
        );
        setEventData2(allData2);
        console.log("eventData2----->", eventData2);
        // allData3
        allData3 = res.data.users.filter(
          (i) => i.refId === eventData2[number3]?.userId
        );
        setEventData3(allData3);
        console.log("eventData3----->", eventData3);
        // allData4
        allData4 = res.data.users.filter(
          (i) => i.refId === eventData3[number4]?.userId
        );
        setEventData4(allData4);
        console.log("eventData4----->", eventData4);
        // allData5
        allData5 = res.data.users.filter(
          (i) => i.refId === eventData4[number5]?.userId
        );
        setEventData5(allData5);
        console.log("eventData5----->", eventData5);
        // allData6
        allData6 = res.data.users.filter(
          (i) => i.refId === eventData5[number6]?.userId
        );
        setEventData6(allData6);
        console.log("eventData6----->", eventData6);
        // allData7
        allData7 = res.data.users.filter(
          (i) => i.refId === eventData6[number7]?.userId
        );
        setEventData7(allData7);
        console.log("eventData7----->", eventData7);
        // allData8
        allData8 = res.data.users.filter(
          (i) => i.refId === eventData7[number8]?.userId
        );
        setEventData8(allData8);
        console.log("eventData8----->", eventData8);
        // allData9
        allData9 = res.data.users.filter(
          (i) => i.refId === eventData8[number9]?.userId
        );
        setEventData9(allData9);
        console.log("eventData9----->", eventData9);
      })
      .catch((error) => {
        console.log("error--->", error);
      });
  }, [
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    number7,
    number8,
    number9,
  ]);
  const { contract: MatrixContract } = useContract(MatrixAddress, MatrixAbi);

  const { data: address, isAddressLoading } = useContractRead(
    MatrixContract,
    "IdToAddress",
    [id]
  );
  const { data: user, isLoading: usersIsLoading } = useContractRead(
    MatrixContract,
    "user",
    [address]
  );

  const handleNext1 = () => {
    if (eventDataFromDb?.length > number1 + 1) {
      setNumber1((pre) => pre + 1);
    }
  };
  const handlePrev1 = () => {
    if (number1 > 0) {
      setNumber1((pre) => pre - 1);
    }
  };
  const handleNext2 = () => {
    if (eventData1?.length > number2 + 1) {
      setNumber2((pre) => pre + 1);
    }
  };
  const handlePrev2 = () => {
    if (number2 > 0) {
      setNumber2((pre) => pre - 1);
    }
  };
  const handleNext3 = () => {
    if (eventData2?.length > number3 + 1) {
      setNumber3((pre) => pre + 1);
    }
  };
  const handlePrev3 = () => {
    if (number3 > 0) {
      setNumber3((pre) => pre - 1);
    }
  };
  const handleNext4 = () => {
    if (eventData3?.length > number4 + 1) {
      setNumber4((pre) => pre + 1);
    }
  };
  const handlePrev4 = () => {
    if (number4 > 0) {
      setNumber4((pre) => pre - 1);
    }
  };
  const handleNext5 = () => {
    if (eventData4?.length > number5 + 1) {
      setNumber5((pre) => pre + 1);
    }
  };
  const handlePrev5 = () => {
    if (number5 > 0) {
      setNumber5((pre) => pre - 1);
    }
  };
  const handleNext6 = () => {
    if (eventData5?.length > number6 + 1) {
      setNumber6((pre) => pre + 1);
    }
  };
  const handlePrev6 = () => {
    if (number6 > 0) {
      setNumber6((pre) => pre - 1);
    }
  };
  const handleNext7 = () => {
    if (eventData6?.length > number7 + 1) {
      setNumber7((pre) => pre + 1);
    }
  };
  const handlePrev7 = () => {
    if (number7 > 0) {
      setNumber7((pre) => pre - 1);
    }
  };
  const handleNext8 = () => {
    if (eventData7?.length > number8 + 1) {
      setNumber8((pre) => pre + 1);
    }
  };
  const handlePrev8 = () => {
    if (number8 > 0) {
      setNumber8((pre) => pre - 1);
    }
  };
  const handleNext9 = () => {
    if (eventData8?.length > number9 + 1) {
      setNumber9((pre) => pre + 1);
    }
  };
  const handlePrev9 = () => {
    if (number9 > 0) {
      setNumber9((pre) => pre - 1);
    }
  };

  return (
    <div className="bg-[#67288e] text-[#caa8f5] border border-white py-8 px-4">
      <div className="flex flex-col">
        {eventDataFromDb.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev1}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventDataFromDb[number1]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext1}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData1?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev2}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData1[number2]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext2}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData2?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev3}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData2[number3]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext3}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData3?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev4}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData3[number4]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext4}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData4?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev5}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData4[number5]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext5}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData5?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev6}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData5[number6]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext6}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData6?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev7}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData6[number7]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext7}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData7?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev8}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData7[number8]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext8}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
        {eventData8?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  mb-2 gap-4">
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handlePrev9}
              >
                Previous
              </button>{" "}
              <li className="border bg-[#3f054f] text-white rounded-full flex justify-center items-center w-12 h-12">
                {eventData8[number9]?.userId}
              </li>
              <button
                className="px-4 py-1 md:px-6 md:py-2 bg-purple-950 text-white rounded"
                onClick={handleNext9}
              >
                Next
              </button>
            </div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-7"
            >
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollableDiv;
