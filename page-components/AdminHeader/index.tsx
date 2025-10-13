"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminHeader() {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const selected = "bg-(--almond)";

  return (
    // <div className="flex min-h-screen bg-(--light) dark:bg-(--dark) text-(--dark) dark:text-(--light)">
      <div className="bg-(--eclipse) w-24">
        <div className="aspect-square w-full mb-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="aspect-square w-full bg-(--almond)"
          />
        </div>
        {Array.from({ length: 6 }, (_, i) => i).map((item, index) => (
          <button
            key={index}
            className={`${
              selectedIndex == index && selected
            } cursor-pointer aspect-square w-full`}
            onClick={() => setSelectedIndex(index)}
          ></button>
        ))}
      </div>
    //   <div className="grow bg-linear-[130deg,var(--almond)_20%,var(--matcha)_80%]">
    //     <div className="backdrop-blur-xs size-full">
    //       Public Homepage
    //       <div className="flex justify-evenly w-full">
    //         <div className="border rounded-xl bg-(--almond) aspect-square w-32">
    //           Almond
    //         </div>
    //         <div className="border rounded-xl bg-(--matcha) aspect-square w-32">
    //           matcha
    //         </div>
    //         <div className="border rounded-xl bg-(--forest) aspect-square w-32">
    //           forest
    //         </div>
    //         <div className="border rounded-xl bg-(--eclipse) aspect-square w-32">
    //           eclipse
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
