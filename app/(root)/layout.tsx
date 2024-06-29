import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = {firstName: 'Adrian', lastName: 'Abimbola'}
  return (
    <main className=" flex h-screen w-full font-inter">
        <Sidebar/>
        {children}
    </main>
  );
}
