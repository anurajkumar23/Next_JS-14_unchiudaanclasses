
import getNewsId from "../../lib/getNewsId";
import he from "he";
import NewsId from "./NewsId";



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
    openGraph: {
      images: `https://api.unchiudaanclasses.com/img/news/${news.photo}`,
      width: 900,
      height: 450,
    },
  };
}


async function NewsPage({ params: { id } }) {
  const news = await getNewsId(id);


  return (
    <>
        <div className="py-[5rem] lg:py-[7rem]">
          <NewsId />
        </div>

    </>
  );
}

export default NewsPage;
