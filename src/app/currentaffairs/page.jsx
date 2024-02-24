import CurrentAffairsCard from "./components/CurrentAffairsCard";

export const metadata = {
  title: "Daily Current Affairs/ कर्रेंट अफेयर्स",
  description:
    "Current Affairs for UPSC, BPSC, बिहार दारोगा, SI, BSSC, Railway, JSSC, SSC, BANKING, Defence..",
    alternates:{
      canonical: `/currentaffairs`
    },
};

function Currentaffairs() {
  return (
    <div className="mx-auto py-[6rem]">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center text-center">
          <span className="mr-2">All Current Affairs</span>
        </h1>
      </div>
      <CurrentAffairsCard />
    </div>
  );
}

export default Currentaffairs;
