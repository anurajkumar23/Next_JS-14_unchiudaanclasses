import signupImg from "../../../public/Images/signup.webp"
import Template from "../login/Template"
// import { Helmet } from "react-helmet-async"

function Signup() {
//   const canonicalUrl = window.location.href;
  return (
    <div className="mx-auto py-[4rem]">
     {/* <Helmet>
        <title>Signup Page</title>
        <meta
          name="description"
          content="Join us for Latest update Free/पैड PDFs of current Affairs"
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet> */}
    <Template
      title="Join for the learning free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
    </div>
  )
}

export default Signup