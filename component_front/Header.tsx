import { Badge } from "@/components/tailgrids/core/badge";

export default function Header() {
  return (
    <>
      {/* contener */}
      <div className="mt-4 text-center">
        {/* Header */}
        <div className="flex justify-center gap-4">
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-red-300 text-gray-200 rotate-20">
            C
          </Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-green-300 text-gray-200 rotate-124">S</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-red-300 text-gray-200 rotate-20">I</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-red-300 text-gray-200 rotate-20">2</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-red-300 text-gray-200 rotate-20">0</Badge>
          <Badge className="color-blue text-3xl rounded-xl py-1 px-3 bg-red-300 text-gray-200 rotate-20">5</Badge>
        </div>
        <div>
          {/* name */}
          <Badge className="mt-4">รักฟ้าใสจุ๊บๆ</Badge>
        </div>
      </div>
    </>
  );
}
