"use client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { MatrixAbi, MatrixAddress } from "./Constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function WalletNavbar() {
  const router = useRouter();
  const address = useAddress();

  const { contract: MatrixContract } = useContract(MatrixAddress, MatrixAbi);

  const { data: user, isLoading: usersIsLoading } = useContractRead(
    MatrixContract,
    "user",
    [address]
  );
  console.log("user----check---0-->", parseInt(Number(user && user[0])));
  console.log("user----check---1-->", parseInt(Number(user && user[1])));
  console.log("user----check---2-->", parseInt(Number(user && user[2])));
  console.log("user----check---3-->", parseInt(Number(user && user[3])));
  console.log("user----check---4-->", parseInt(Number(user && user[4])));
  const chickHandler = () => {
    router.push(`/wallet-dashboard?uid=${parseInt(Number(user && user[3]))}`);
  };
  const statisticsHandler = () => {
    router.push("/wallet-dashboard?user=statistics");
  };

  return (
    <Disclosure
      as="nav"
      className="border-b-[1px] border-[#888888] bg-[#541d69]  sm:px-5"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:py-3  sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className=" z-50 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#78428d] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <img
                      src="./logoo.png"
                      alt=""
                      srcSet=""
                      className="w-20 z-40 hidden md:block"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex  items-center justify-center gap-3">
                {" "}
                <button
                  onClick={chickHandler}
                  className="bg-[#80299d] hidden md:block border border-teal-400 px-4 py-[10px] text-gray-200 font-semibold md:text-lg rounded-lg"
                >
                  Your Dashhboard{" "}
                </button>{" "}
                <button
                  onClick={statisticsHandler}
                  className="bg-[#80299d] hidden md:block border border-teal-400 px-4 py-[10px] text-gray-200 font-semibold md:text-lg rounded-lg"
                >
                  Statistics{" "}
                </button>{" "}
              
                <ConnectWallet className="w-full   cursor-pointer rounded-3xl bg-[#9064b2] p-[10px] text-[12px]  font-normal leading-[20px] text-white sm:p-[15px] sm:text-[15px] md:w-[60%]" />{" "}
              </div>

              <Link href="/">
                <img
                  src="./logoo.png"
                  alt=""
                  srcSet=""
                  className="w-20 block sm:hidden"
                />
              </Link>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className=" px-2 pb-3 pt-2 z-50 bg-[#7d35a7] absolute w-full">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={chickHandler}
                  className="bg-[#80299d] block border border-teal-400 px-4 py-[12px] text-gray-200 font-semibold text-sm rounded-lg"
                >
                  Your Dashboard{" "}
                </button>{" "}
                <button
                  onClick={statisticsHandler}
                  className="bg-[#80299d]  border border-teal-400 px-4 py-[10px] text-gray-200 font-semibold md:text-lg rounded-lg"
                >
                  Statistics{" "}
                </button>{" "}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
