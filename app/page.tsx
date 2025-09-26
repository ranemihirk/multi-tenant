"use client";

import Image from "next/image";
import { useTenantContext } from "@/app/contexts/TenantContext";

export default function Home() {
  const { tenant } = useTenantContext();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        🎬 {tenant ?? "No Tenants"} Production House SaaS
      </h1>
      <p className="mt-4 text-gray-600">
        Manage shoots, crew, equipment, and expenses — all in one place.
      </p>
    </main>
  );
}
