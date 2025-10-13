import type { Metadata } from "next";
import { headers } from "next/headers";
import AdminHeader from "@/page-components/AdminHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="relative flex min-h-screen bg-(--light) dark:bg-(--dark) text-(--dark) dark:text-(--light)">
      <AdminHeader />
      {children}
    </section>
  );
}
