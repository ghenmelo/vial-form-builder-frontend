"use client";

import { HouseIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <div className="w-full bg-primary-foreground rounded-sm flex items-center py-4 px-4 justify-between">
      <div className="flex flex-row gap-2 items-center">
        <Link href={"/form-viewer"}>
          <HouseIcon width={30} height={24}></HouseIcon>
        </Link>
        <h1 className="text-2xl font-normal tracking-tight">Form Builder</h1>
      </div>
    </div>
  );
}
