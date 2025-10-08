"use client";
import Image from "next/image";
import { useTenantContext } from "@/app/contexts/TenantContext";
import * as Styles from "./styles";

export default function Home() {
  const { tenant } = useTenantContext();

  return (
    <div className="bg-(--eclipse) w-full">
      <div className="aspect-square w-24 m-auto">
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="aspect-square w-full bg-(--light)"
        />
      </div>
    </div>
  );
}
