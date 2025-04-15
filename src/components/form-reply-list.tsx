"use client";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import EyeIconButton from "./action-icons/eye-icon-button";
import { SourceRecord } from "@/types/FormComponent";

interface Props {
  setVisualizingDataId: (id?: string) => void;
  answers: SourceRecord[];
}

export default function FormReplyList({
  setVisualizingDataId,
  answers,
}: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Answer</TableHead>
            <TableHead className="flex justify-center items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {answers &&
            answers.map((answer, index) => (
              <TableRow key={answer.formId + index}>
                <TableCell className="w-[100%]">
                  Answer number: {index + 1}
                </TableCell>
                <TableCell className="flex flex-row items-center justify-center">
                  <EyeIconButton
                    description="View Form"
                    onClickAction={() => setVisualizingDataId(answer.id)}
                  ></EyeIconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
