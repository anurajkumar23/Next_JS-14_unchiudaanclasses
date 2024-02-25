"use client";

import { SocialMedia } from "../../components/Socialmedia/socialmedia";
import { useGetUserQuery } from "../../redux/slices/userSlices";
import PatchNewsForm from "./PatchNewsForm";
import { usePathname } from "next/navigation";

const NewsIds = ({ news }) => {
  const { data: userData } = useGetUserQuery();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const pageUrl = `${origin}`;
  const pageFullUrl = pageUrl + usePathname();
  let role;
  if (userData) {
    if (userData.role === "admin") {
      role = true;
    } else {
      role = false;
    }
  } else {
    role = false;
  }
  return (
    <div>
      <SocialMedia url={pageFullUrl} />
      {role && <PatchNewsForm details={news} />}
    </div>
  );
};

export default NewsIds;
