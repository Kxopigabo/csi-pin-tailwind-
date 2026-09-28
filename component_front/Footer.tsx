"use client";

import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Twitter } from "@tailgrids/icons";
import Link from "next/link";

export default function Footer() {
  return (
    /* con */
    <>
      <div className=" flex justify-center mt-2 ">
        <Badge className="bg-primary text-black text-lg">
          68052331 ภูเกล้า ผ่องเพ็ญศรี
        </Badge>
      </div>
      {/* /* contacts */}
      <div className="mt-2">
        <div className="flex justify-center gap-6">
          <Link href="#">
            <Facebook className="text-blue-700" />
          </Link>
          <div className="border-l-1"></div>
          <Twitter />
        </div>
      </div>
    </>
  );
}
