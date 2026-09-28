"use client";

import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { useState } from "react";

export default function Page() {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    // todos contenr
    <div className="w-[600px]  mx-auto">
      {/* controll */}
      <div className="flex justify-between mt-4">
        {/* toggle */}
        <Toggle label="Show only waiting" defaultChecked />
        {/* dorpdow */}
        <div className="w-2/5">
          <NativeSelect placeholder="Select an option">
            <NativeSelectOption value="option1">Option 1</NativeSelectOption>
            <NativeSelectOption value="option2">Option 2</NativeSelectOption>
            <NativeSelectOption value="option3">Option 3</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>
      {/* table */}
      <div className="mt-4">
        <TableRoot>
          <TableHeader>
            <TableRow className="bg-background-soft-50 [&>th]:text-text-50">
              <TableHead scope="col">Product</TableHead>
              <TableHead scope="col">Price</TableHead>
              <TableHead scope="col">Stock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>pro</TableCell>
              <TableCell>10</TableCell>
              <TableCell>In Stock</TableCell>
            </TableRow>
            
          </TableBody>
        </TableRoot>
      </div>
      {/* pagination */}
      <div className = 'mt-2 w-2/3 mx-auto'>
        <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      sideLayout="label"
    />
      </div>
    </div>
  );
}
