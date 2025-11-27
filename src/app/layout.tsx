// app/layout.tsx
import "./globals.css";
import { Poppins } from "next/font/google";
import ClientProviders from "./client-providers"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export const metadata = {
  title: "Ace",
  description: "Ace Ninja Path, where your ninja journey begins! Prepare to master powerful skills, forge your own unique path, and face off against epic enemies in thrilling battles. Dive into online PvP duels, join clan wars for incredible rewards, and shape your destiny with a dynamic skill system that lets you build your perfect warrior.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
