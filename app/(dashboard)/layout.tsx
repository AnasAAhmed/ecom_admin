import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcelle - Admin Dashboard",
  description: "Admin dashboard to manage Borcelle's data",
};
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "moderator";
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { sessionClaims } = auth();
  return (
    <ClerkProvider><html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        {/* {sessionClaims?.metadata.role !== "admin" ?
          <div className="h-screen flex flex-col justify-center items-center gap-5">
            <p className="text-heading4-bold text-red-1">Your not an Admin you Dont have access yet</p>
            <UserButton /> Sign-out

          </div>
          : */}
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1">{children}</div>
          </div>
        {/* } */}
      </body>
    </html>
    </ClerkProvider>
  );
}


