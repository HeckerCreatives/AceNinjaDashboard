'use client';

import { ReactNode, useState, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            padding: '8px',
            color: 'white',
            backgroundColor: 'black',
            fontSize: '12px',
          },
        }}
      />
    </Suspense>
  );
}
