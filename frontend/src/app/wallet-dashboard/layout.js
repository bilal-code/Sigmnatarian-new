import WalletNavbar from "../../component/WalletNavbar";

export default function RootLayout({ children }) {
  return (
    <>
      <WalletNavbar />
      {children}
    </>
  );
}
