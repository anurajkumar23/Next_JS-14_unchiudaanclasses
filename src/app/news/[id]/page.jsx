
import getNewsId from "../../lib/getNewsId";
import he from "he";
import NewsId from "./NewsId";
import Image from "next/image";

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
    // alternates:{
    //   canonical: `/news/${id}`
    // },
    // openGraph: {
    //   images: `https://api.unchiudaanclasses.com/img/news/${news.photo}`,
    //   width: 900,
    //   height: 450,
    // },
  };
}


async function NewsPage({ params: { id } }) {
  const news = await getNewsId(id);


  return (
    <>
        <div className="py-[5rem] lg:py-[7rem]">
        <div className="mx-6">
        <h1
          className="text-center font-bold text-[2rem] md:text-[2.5rem] mb-6"
          dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(news.heading) }}
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
          dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(news.article) }}
        />
        {/* <SocialMedia /> */}
      </div>
          <NewsId />
        </div>

    </>
  );
}

export default NewsPage;
