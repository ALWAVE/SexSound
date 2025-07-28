import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata = {
  title: "Sex Sound",
  description: "Sex Sound",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={rubik.variable}>
      <body className="bg-black text-white font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
