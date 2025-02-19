"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import { Plus } from "lucide-react";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide left-0 top-0 sticky p-10 flex flex-col gap-12 bg-blue-2 shadow-xl max-lg:hidden">
      <Link href={'/'}>
        <Image src="/logo.png" alt="logo" width={150} height={70} />
      </Link>
      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : "text-grey-1"
              }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-3 justify-start">
        <p className="text-body-medium mb-3">Quick links</p>

        <Link
          href={'/products/new'}
          key={'Create Product'}
          className={`flex gap-2 text-base-medium ${pathname === '/products/new' ? "text-blue-1" : "text-grey-1"
            }`}
        >
          <Plus size={'1rem'} /> <p>Create Product</p>
        </Link>
        <Link
          href={'/collections/new'}
          key={'Create Collection'}
          className={`flex gap-2 text-base-medium ${pathname === '/collections/new' ? "text-blue-1" : "text-grey-1"
            }`}
        >
          <Plus size={'1rem'} /> <p>Create Collection</p>
        </Link>
      </div>
      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
