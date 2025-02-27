"use client";
import { useSearchParams } from "next/navigation";
import WalletRegistrationComp from "../../component/WalletRegestration";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  return (
    <div>
      <WalletRegistrationComp id={id} />
    </div>
  );
};

export default Page;
