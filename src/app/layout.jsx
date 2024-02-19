import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Home/HomeUI/Navbar";
import Footer from "./components/Home/HomeUI/Footer";
import Provider from "./provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ऊँची उड़ान Classes | Unchiudaan Classes ",
  description: "Current Affairs for UPSC, BPSC, बिहार दारोगा, SI, BSSC, Railway, JSSC, SSC, BANKING, Defence, और अन्य Government Job Examinations के लिए ऊँची उड़ान वेबसाइट को join करें।",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
      <Navbar/>
      {children}
      <Footer/>
      </Provider>
      </body>
    </html>
  );
}
