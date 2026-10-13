import { Badge } from "@/components/tailgrids/core/badge";

export default function Header() {
  return (
    <>
      {/* contener */}
      <div className="mt-4 text-center">
        {/* Header */}
        <div className="flex justify-center gap-4">
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-yellow-300 text-white-100 rotate-20">
            C
          </Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-green-300 text-white-100 rotate-340">S</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-blue-300 text-white-100 rotate-25">I</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-purple-300 text-white-100 rotate-340">2</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-black text-white-100 rotate-20">0</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-orange-300 text-white-100 rotate-320">5</Badge>
        </div>
        <div>
          {/* name */}
          <Badge className="mt-4 text-sm bg-black text-white rounded-lg">FRONT END SOFTWARE DEVELOPMENT</Badge>
        </div>
      </div>
    </>
  );
}
