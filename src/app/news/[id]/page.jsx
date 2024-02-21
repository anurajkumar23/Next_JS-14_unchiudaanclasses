import Link from "next/link";
import Image from "next/image";
import getNewsId from "../../lib/getNewsId";
import he from "he";
import NewsId from "./NewsId";

const decodeHtmlEntities = (html) => {
  return he.decode(html);
};

export async function generateMetadata({ params: {id}} ){
  const news = await getNewsId(id);
  const decodeAndRemoveHtml = (html) => {
    // Decode HTML entities
    const decodedHtml = he.decode(html);
    // Remove HTML tags
    const plainText = decodedHtml.replace(/<[^>]*>?/gm, '');
    return plainText;
  };
  return{
    title: decodeAndRemoveHtml(news.heading),
    description: decodeAndRemoveHtml(news.article),
  };
}


async function NewsPage({ params: { id } }) {
  const news = await getNewsId(id);
  if (!news) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link href="">
        <div className="py-[5rem] lg:py-[7rem]">
          <div className="mx-6">
            <h1
              className="text-center font-bold text-[2rem] md:text-[2.5rem] mb-6"
              dangerouslySetInnerHTML={{
                __html: decodeHtmlEntities(news.heading),
              }}
            ></h1>
            <div className="md:mx-12 my-1">
              <Image
                width={500}
                height={500}
                alt="meow"
                src={`https://api.unchiudaanclasses.com/img/news/${news.photo}`}
                className="w-full mx-auto rounded-lg"
              />
            </div>

            <p
              className="mt-4 text-justify text-lg "
              dangerouslySetInnerHTML={{
                __html: decodeHtmlEntities(news.article),
              }}
            />
            {/* <SocialMedia /> */}
          </div>
          <NewsId />
        </div>
      </Link>
    </>
  );
}

export default NewsPage;
