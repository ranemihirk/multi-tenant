"use client";
import Image from "next/image";
import { useTenantContext } from "@/contexts/TenantContext";
import Login from '@/page-components/Login';

export default function Home() {
  const { tenant } = useTenantContext();

  return (
    <div className="bg-(--eclipse) w-full flex justify-between items-center">
      <div></div>
      <div className="aspect-square w-24">
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="aspect-square w-full bg-(--light)"
        />
      </div>
      <div className="px-4"><Login /></div>
    </div>
  );
}
