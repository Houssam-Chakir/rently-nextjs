import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const poppins = Poppins({
  subsets: ["latin"], // make sure you include at least one subset
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rently",
  description: "Rent your dream home right now",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang='en' className={poppins.variable}>
        <body className={` antialiased`}>
          <>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer/>
          </>
        </body>
      </html>
    </AuthProvider>
  );
}
