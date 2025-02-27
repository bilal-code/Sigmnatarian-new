"use client";
import {
  ActiveChain,
  MatrixAbi,
  MatrixAddress,
  DiaAbi,
  DiaAddress,
} from "./Constants";
import {
  ThirdwebSDK,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import Link from "next/link";
import { useState } from "react";

const WalletRegistrationComp = ({ id }) => {
  const address = useAddress();
  const [referId, setReferId] = useState("");
  // Contracts
  const { contract: MatrixContract } = useContract(MatrixAddress, MatrixAbi);
  const { contract: DiaContract } = useContract(DiaAddress, DiaAbi);

  // Read Functions (Token)
  const { data: balance, isLoading: balanceIsLoading } = useContractRead(
    DiaContract,
    "balanceOf",
    [address]
  );

  const { data: allowance, isLoading: allowanceIsLoading } = useContractRead(
    DiaContract,
    "allowance",
    [address, MatrixAddress]
  );
  // Read Functions
  const { data: isUserExists, isLoading: isUserExistsILoading } =
    useContractRead(MatrixContract, "isUserExists", [address]);

  //    Write functions
  const { mutateAsync: approve, isLoading: approveIsLoading } =
    useContractWrite(DiaContract, "approve");

  const { mutateAsync: Register, isLoading: registerIsLoading } =
    useContractWrite(MatrixContract, "Register");

  // Approve Function
  const callApprove = async () => {
    try {
      const data = await approve({
        args: [MatrixAddress, parseEther("10")],
      });
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // Register Function
  const callRegister = async () => {
    try {
      const sdk = new ThirdwebSDK(ActiveChain);
      const contract = await sdk.getContract(MatrixAddress, MatrixAbi);
      const refAddr = await contract.call("IdToAddress", [id]);
      console.log(refAddr, " is:", id, "Line no 68");
      const data = await Register({
        args: [address, refAddr],
      });
      console.log("file: page.tsx:214  callRegister  data:", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // Functions
  const { data: user, isLoading: usersIsLoading } = useContractRead(
    MatrixContract,
    "user",
    [address]
  );
  const currentUsers = parseInt(Number(user && user[4]));
  return (
    <main className=" bg-[#3f054f] h-screen">
      <div className="h-96 flex md:h-screen md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-5xl  items-center">
          <div className="relative w-fit px-4  md:px-0">
            <div className="rounded-[9px] bg-[#67288e] p-4 md:p-12  text-center">
              <div className="flex w-full  flex-col items-center justify-center rounded-md border p-5">
                <h1 className="text-center font-medium text-[#caa8f5] text-lg md:text-2xl lg:text-3xl md:mb-[30px]">
                  USER REGISTRATION WITH WALLET ADDRESS
                </h1>

                {address !== undefined ? (
                  isUserExistsILoading ? (
                    <div className="mx-auto my-16 w-full gap-4 text-white xsm:w-[70%]">
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="mr-3 inline h-4 w-4 animate-spin text-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      LOADING...
                    </div>
                  ) : !isUserExists ? (
                    <div className="w-full">
                      <div className=" text-[15px] text-white  sm:text-[20px]">
                        <div className="flex justify-around">
                          <p>Your Balance :</p>
                          <p>{formatEther(String(balance || 0))}</p>
                        </div>
                        <div className="flex justify-around">
                          <p>Registration Fees :</p>
                          <p>10 USDT</p>
                        </div>
                        <div className="flex justify-around">
                          <p>Your Allowance :</p>
                          <p>{formatEther(String(allowance || 0))}</p>
                        </div>
                      </div>
                      {Number(String(balance || 0)) <= 10 ? (
                        <div className="my-4 md:my-10 flex justify-center gap-4 text-white">
                          Not Enough Balance
                        </div>
                      ) : (
                        <div>
                          {/* Approval Conditions */}
                          {Number(String(balance || 0)) >= 10.0 &&
                          Number(String(allowance || 0)) <= 10.0 ? (
                            approveIsLoading ? (
                              <button
                                className="mt-4 inline-block h-fit  w-full cursor-pointer rounded-3xl bg-[#9064b2] p-[10px] text-[12px]  font-normal leading-[20px] text-white sm:p-[15px] sm:text-[15px] md:w-[60%]"
                                disabled
                              >
                                <svg
                                  aria-hidden="true"
                                  role="status"
                                  className="mr-3 inline h-4 w-4 animate-spin text-white"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                  />
                                </svg>
                                LOADING...
                              </button>
                            ) : (
                              <button
                                onClick={() => callApprove()}
                                className="mt-4 inline-block h-fit  w-full cursor-pointer rounded-3xl bg-[#9064b2] p-[10px] text-[12px]  font-normal leading-[20px] text-white sm:p-[15px] sm:text-[15px] md:w-[60%]"
                              >
                                APPROVE
                              </button>
                            )
                          ) : null}

                          {/* Registration Conditions */}
                          {Number(String(allowance || 0)) >= 10.0 ? (
                            registerIsLoading ? (
                              <button
                                className="mt-4 inline-block h-fit  w-full cursor-pointer rounded-3xl bg-[#9064b2] p-[10px] text-[12px]  font-normal leading-[20px] text-white sm:p-[15px] sm:text-[15px] md:w-[60%]"
                                disabled
                              >
                                <svg
                                  aria-hidden="true"
                                  role="status"
                                  className="mr-3 inline h-4 w-4 animate-spin text-white"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                  />
                                </svg>
                                LOADING...
                              </button>
                            ) : (
                              <div>
                                <input
                                  name="membership"
                                  placeholder="Refferrer ID"
                                  value={referId || id}
                                  onChange={(e) => setReferId(e.target.value)}
                                  className="mx-auto mt-4 inline-block h-fit w-full rounded-3xl border-2 border-[#9064b2] bg-transparent p-[10px] text-[12px] font-normal leading-[20px] text-white placeholder:text-center xsmm:w-[65%] sm:p-[15px] sm:text-[18px] "
                                  required
                                />

                                <button
                                  onClick={() => callRegister()}
                                  className="mt-4 inline-block h-fit  w-full cursor-pointer rounded-3xl bg-[#9064b2] p-[10px] text-[12px]  font-normal leading-[20px] text-white sm:p-[15px] sm:text-[15px] md:w-[40%]"
                                >
                                  REGISTER
                                </button>
                              </div>
                            )
                          ) : null}
                        </div>
                      )}
                    </div>
                  ) : (
                    //  User already Registered
                    <div className="my-16 flex justify-center  gap-4">
                      <p className="text-white">YOU ARE ALREADY REGISTERED</p>
                      <Link
                        href={`/wallet-dashboard?uid=${currentUsers}`}
                        className="!text-blue-500 hover:underline"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  )
                ) : (
                  <div className="my-16 flex justify-center gap-4">
                    <p className="text-white">PLEASE CONNECT YOUR WALLET</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WalletRegistrationComp;
