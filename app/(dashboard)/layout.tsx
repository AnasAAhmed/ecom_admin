import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider, SignOutButton, UserButton } from "@clerk/nextjs";

import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";
import InternetStatus from "@/components/custom ui/InternetStatus";
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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
            <ToasterProvider />
            {/* <InternetStatus/> */}
            {/* Uncomment and implement the auth check if needed */}
            {/* {sessionClaims?.metadata.role !== "admin" ? (
              <div className="h-screen flex flex-col justify-center items-center gap-5">
                <p className="text-heading4-bold text-red-1">You are not an Admin. You don not have access yet.</p>
                <UserButton /> <SignOutButton>Sign-out</SignOutButton>
              </div>
            ) : ( */}
              <div className="flex max-lg:flex-col text-grey-1">
                <LeftSideBar />
                <TopBar />
                <div className="flex-1">{children}</div>
              </div>
            {/* )} */}
        </body>
      </html>
    </ClerkProvider>
  );
}
