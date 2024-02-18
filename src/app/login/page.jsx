import loginImg from "../../../public/Images/login.webp";
// import Template from "../Home/core/Auth/Template";
import Template from "./Template"
// import { Helmet } from "react-helmet-async";

function Login() {
//   const canonicalUrl = window.location.href;
  return (
    <div className="mx-auto py-[4rem]">
      {/* <Helmet>
        <title>Login Page</title>
        <meta
          name="description"
          content="Join us for Latest update Free/पैड PDFs of current Affairs"
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet> */}
      <Template
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={loginImg}
        formType="login"
      />
    </div>
  );
}

export default Login;
