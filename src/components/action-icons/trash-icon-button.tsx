"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TrashIcon } from "lucide-react";
import Link from "next/link";

interface props {
  description: string;
  destination?: string;
  onClickAction?: () => void;
}

export default function TrashIconButton({
  destination,
  description,
  onClickAction,
}: props) {
  const handleClick = () => {
    if (destination) {
      return (
        <Link href={destination}>
          <TrashIcon></TrashIcon>
        </Link>
      );
    } else if (onClickAction) {
      return (
        <TrashIcon
          className="cursor-pointer"
          onClick={onClickAction}
        ></TrashIcon>
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
