// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

type TenantContext = {
  tenant: string | null;
  setTenant: Dispatch<SetStateAction<string | null>>;
};

type TenantContextProviderProps = {
  children: ReactNode;
  org: string | null;
};

export const TenantContext = createContext<TenantContext | null>(null);

export default function TenantContextProvider({
  children,
  org,
}: TenantContextProviderProps) {
  const [tenant, setTenant] = useState<string | null>(org);

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenantContext() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error(
      "useTenantContext must be called within a TenantContextProvider"
    );
  }
  return context;
}