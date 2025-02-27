"use client";
import { useSearchParams } from "next/navigation";
import WalletDashboardHeading from "../../component/WalletDashboardHeading";
import WalletDashboardMain from "../../component/WalletDashboardMain";
import ScrollableDiv from "../../component/tryyyy";
import Statistics from "../../component/Statistics";
const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("uid");
  const userStatistics = searchParams?.get("user");
  return (
    <div className="bg-[#3f054f] ">
      <WalletDashboardHeading id={id} />
      <div className="flex justify-center items-center pb-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5  md:gap-0 lg:grid-cols-3 w-[1000px]">
          <div className="">
            <WalletDashboardMain id={id} />
          </div>
          {userStatistics === "statistics" ? (
            <div className=" lg:col-span-2 px-4">
              <Statistics />
            </div>
          ) : (
            <div className="lg:col-span-2 px-4">
              <ScrollableDiv id={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
