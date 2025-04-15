"use client";

import { HouseIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-gradient-to-r from-[#7D7F9C] to-[#8BA5A1] rounded-sm flex items-center py-4 px-4 justify-between">
      <div className="flex flex-row gap-2 items-center">
        <Link href={"/form-viewer"}>
          <HouseIcon width={30} height={24}></HouseIcon>
        </Link>
        <h1 className="text-2xl font-normal tracking-tight">Form Builder</h1>
      </div>
    </div>
  );
}
