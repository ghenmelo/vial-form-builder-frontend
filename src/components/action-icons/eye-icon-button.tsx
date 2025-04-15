"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

interface props {
  description: string;
  destination?: string;
  onClickAction?: () => void;
}

export default function EyeIconButton({
  destination,
  description,
  onClickAction,
}: props) {
  const handleClick = () => {
    if (destination) {
      return (
        <Link href={destination}>
          <EyeIcon></EyeIcon>
        </Link>
      );
    } else if (onClickAction) {
      return (
        <EyeIcon className="cursor-pointer" onClick={onClickAction}></EyeIcon>
      );
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{handleClick()}</TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
