import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Home/HomeUI/Footer";
import Provider from "./provider";
import AdSenseUnit from "./AdSenseUnit"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "ऊँची उड़ान Classes | Unchiudaan Classes ",
    template: '%s | Unchiudaan Classes ',
  },
  description: "Current Affairs for UPSC, BPSC, बिहार दारोगा, SI, BSSC, Railway, JSSC, SSC, BANKING, Defence, और अन्य Government Job Examinations के लिए ऊँची उड़ान वेबसाइट को join करें।",
  keywords: ['Daily Quiz / डेली प्रश्न', 'Daily Current Affairs/ कर्रेंट अफेयर्स', 'Monthly PDFs / मासिक PDF ', 'News / Blog ,unchi udan classes', 'unchiudaanclasses', 'uchiudaan classes','uchiudan','Unchiudaan classes','ऊँची उड़ान classes',
  'Daily Current Affairs','Unchiudaan Current Affairs', 'Current Affairs for UPSC', 'BPSC','बिहार दारोगा','SI','BSSC','Railway','JSSC', 'SSC', 'BANKING', 'Defence','और अन्य Government Job Examinations'],
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    images: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/uchiudan.png`,
    width: 800,
    height: 600,
  },
  // metadataBase: new URL("${process.env.NEXT_PUBLIC_FRONTEND_URL}"),
  // verification:{
  //   google: "google-site-verification=wjJCnSurHqFDah3rhIg7OZxlVqiQ8mg33S0ixhqLuJA",
  // }
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
      <Navbar/>
      {children}
      <Footer/>
      <AdSenseUnit adClient="ca-pub-2481549712830615" />
      </Provider>  
      </body>
    </html>
  );
}
