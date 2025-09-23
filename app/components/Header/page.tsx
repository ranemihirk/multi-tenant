'use client'
import Image from "next/image";
import { useTenantContext } from "@/app/contexts/TenantContext";
import * as Styles from './styles';

export default function Home() {
  const { tenant } = useTenantContext();

  return (
    <header></header>
  );
}
