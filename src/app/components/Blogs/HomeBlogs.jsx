"use client"
import BlogComp from "./container";
import Link from "next/link";

import { useGetLastestCurrentAffairsQuery } from "../../redux/slices/currentAffairsApi";

export default function HomeBlogs() {
  const { data: affairs, error, isLoading } = useGetLastestCurrentAffairsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!affairs) {
    return <div>No data available</div>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-center text-[1.5rem] md:text-[2rem] mb-4 font-semibold">
        Latest Current Affairs
      </h1>
      <p className="text-justify text-md mb-16 md:mx-[6rem]">
        Current Affairs for BPSC, UPPSC, MPPSC, JPSC, BSSC, RPSC, SSC, और अन्य
        Competitive और&nbsp;Government Job Examinations के लिए ऊँची उड़ान वेबसाइट
        और फेसबुक पेज को Follow करें।
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-[58px]">
        {affairs.map((blog) => {
          const createdAt = new Date(blog.createdAt);
          const updatedAt = new Date(blog.updatedAt);
          const formattedDate = createdAt.toLocaleString("default", {
            day: "numeric",
            month: "long",
          });
          const updatedDate = updatedAt.toLocaleString("default", {
            day: "numeric",
            month: "long",
          });

          return (
            <BlogComp
              key={blog._id}
              date={formattedDate}
              title={blog.topic}
              imageSrc={blog.photo}
              updatedDate={updatedDate}
              category={blog.category}
              set_no={blog.set_no}
              id={blog._id}
            />
          );
        })}
      </div>
      <Link href="/Currentaffairs">
        <div className="text-center hover:bg-purple-700 mt-6 text-xl mx-auto  font-semibold w-fit  px-5 py-1 bg-purple-500 text-white rounded-xl hover:shadow-xl ">
          View More
        </div>
      </Link>
    </div>
  );
}
