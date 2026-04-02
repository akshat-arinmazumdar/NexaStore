"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Disable periodic / focus-based refetch to avoid console noise during
  // fast navigations (and to keep tests strict about zero console errors).
  return (
    <SessionProvider
      session={null}
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
