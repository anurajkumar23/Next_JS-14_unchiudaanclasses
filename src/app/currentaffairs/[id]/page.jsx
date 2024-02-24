
import getCurrentAffairs from "../../lib/getCurrentAffairs";

import CurrentaffairsId from "./CurrentaffairsId";




export async function generateMetadata({ params: { id } }) {
  const affairDetails = await getCurrentAffairs(id);
  const removeHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return {
    title: removeHtmlTags(affairDetails.topic),
    description: removeHtmlTags(affairDetails.description),
        alternates:{
        canonical: `/currentaffairs/${id}`
      },
    openGraph: {
      images: `https://api.unchiudaanclasses.com/img/affairs/${affairDetails.photo}`,
      width: 900,
      height: 450,
    },
  };
}

async function BlogsPage({ params: { id } }) {
  const affairDetails = await getCurrentAffairs(id);
  return (
    <>
      <div className=" py-[1rem] lg:py-[4rem]">
        <div className=" mx-4 ">
         
           <CurrentaffairsId affairDetailsData= {affairDetails}/>
        </div>
       
      </div>

      
    </>
  );
}

export default BlogsPage;
