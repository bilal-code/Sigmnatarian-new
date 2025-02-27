"use client";
import { useEffect, useState } from "react";
import axios from "axios";
const Statistics = ({ address }) => {
  const [currentPage, setCurrentPage] = useState(6);
  const [num, setNum] = useState(0);
  const [serialNo, setSerialNo] = useState(1);
  const [eventDataFromDb, setEventDataFromDb] = useState([]);
  console.log("eventDataFromDb---statistics--->", eventDataFromDb);
  useEffect(() => {
    let allData;
    axios
      .get("https://check-back.vercel.app/user/getUserData/")
      .then((res) => {
        allData = res.data.users;
        setEventDataFromDb(allData);
      })
      .catch((error) => {
        console.log("error--->", error);
      });
  }, []);

  const nextHandler = () => {
    if (currentPage < eventDataFromDb.length) {
      setNum(currentPage);
      setCurrentPage((prev) => prev + 6);
      setSerialNo((prev) => prev + 5);
    }
  };
  const backHandler = () => {
    if (currentPage > 6) {
      setNum((prev) => prev - 6);
      setSerialNo((prev) => prev - 5);
      setCurrentPage((prev) => prev - 6);
    }
  };
  return (
    <div className="flex flex-col justify-center">
      <div className=" flex flex-col justify-center  md:h-96 rounded-xl  bg-[#67288e88] text-center border border-white lg:p-4">
        {/* <h2 className="text-3xl font-bold text-gray-300">Coming Soon...</h2> */}
        {eventDataFromDb.length > 0 ? (
          <div className="lg:w-full">
            <table className=" lg:w-full text-sm text-left rtl:text-right bg-[#401b5788] ">
              <thead className=" text-[12px] md:text-md text-gray-100 uppercase bg-[#74469188] ">
                <tr>
                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3">
                    registration date
                  </th>
                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3 ">
                    ref id
                  </th>
                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3 ">
                    user id
                  </th>

                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3 ">
                    earn ref
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventDataFromDb.slice(num, currentPage).map((i, index) => (
                  <tr
                    key={index}
                    className="text-gray-200 border-b bg-[#401b5788]  "
                  >
                    <td className="px-3 md:px-6 py-4">
                      {new Date(i.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 md:px-6 py-4">{i.refId}</td>
                    <td className="px-3 md:px-6 py-4">{i.userId}</td>

                    <td className="px-3 md:px-6 py-4">$ 4</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-lg font-bold text-white">...Loading</h2>
        )}
      </div>
      <div className="flex justify-center gap-5 py-4">
        <button
          onClick={backHandler}
          className="bg-[#a05ec988] text-white border border-gray-200 px-3 py-2 rounded-lg "
        >
          Previous
        </button>
        <button
          onClick={nextHandler}
          className="bg-[#9d55ca88] text-white border border-gray-200 px-3 py-2 rounded-lg "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Statistics;
