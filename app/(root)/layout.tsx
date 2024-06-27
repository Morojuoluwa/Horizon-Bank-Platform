import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";



export const metadata: Metadata = {
  title: "Horizon Bank",
  description: "Horizon is a modern bankimg platform for everyone",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main></main>
  );
}
