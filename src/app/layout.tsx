'use client'
import "./globals.css";
import { Poppins } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300" , "400", "500", "600","700","800","900"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient());


  
  return (
    <html lang="en">
      <body
      suppressHydrationWarning={true}
        className={`${poppins.className} antialiased`}
      >
        <Suspense>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster
              position="top-right"
              reverseOrder={false}
            
             toastOptions={{
              className:' ',
              style:{
                padding: '8px',
                color: 'white',
                backgroundColor: 'black',
                fontSize: '12px'
              }
             }}
             
            />
        </Suspense>
      </body>
    </html>
  );
}
