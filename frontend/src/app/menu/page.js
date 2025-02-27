"use client";
import { useRouter } from "next/navigation";
import RegistrationDashboard from "../../component/RegistrationDashboard";
import { useContext, useEffect, useState } from "react";
import { RefIdContext } from "../../contextApiID";

const Page = () => {
  const userRefIdFunc = useContext(RefIdContext);
  const setUserIdHandler = userRefIdFunc.userIdHandler;
  const uid = userRefIdFunc.userId;
  const router = useRouter();

  const idHandler = (id) => {
    setUserIdHandler(id);
  };
  const handleClick = (id) => {
    router.push(`/wallet-dashboard?uid=${id}`);
  };
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  function getCurrentTime() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const data = new Date();
    let gethour = Math.round(data.getHours());
    const mint = Math.round(data.getMinutes());
    const amPm = gethour >= 12 ? "PM" : "AM";
    if (gethour > 12) {
      gethour -= 12;
    }
    const formattedTime = `${days[data.getDay()]} At ${
      gethour < 10 ? ` 0${gethour}` : `${gethour} `
    }:${mint < 10 ? " 0" + mint : ` ${mint}`} ${amPm}`;
    return formattedTime;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#3f054f] h-screen">
      {/* <div className="flex justify-center items-center">
        <h2 className="text-3xl lg:text-5xl text-white font-semibold">
          Dashboard Coming Soon in
        </h2>
        <p className="text-2xl text-white font-semibold">
          {" : " + currentTime}
        </p>
      </div> */}
      <RegistrationDashboard viewHandler={handleClick} idHandler={idHandler} />
    </div>
  );
};

export default Page;
