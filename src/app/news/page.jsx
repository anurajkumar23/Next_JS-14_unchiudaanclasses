/* eslint-disable react/prop-types */
import NewsCard from "./components/NewsCard";

export const metadata = {
  title: "News / Blog",
  description: "नवीनतम घटनाओं के साथ अपडेट रहें",
};

function News() {
  return (
    <div className="mx-[10%] pt-[6rem] ">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center text-center">
          <span className="mr-2">Daily News</span>
          <span className="text-green-500 text-lg lg:text-xl">
            नवीनतम घटनाओं के साथ अपडेट रहें
          </span>
        </h1>

        <NewsCard />
      </div>
    </div>
  );
}

export default News;
