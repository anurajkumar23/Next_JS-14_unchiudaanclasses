import loginImg from "../../../public/Images/login.webp";
import Template from "./Template"


export const metadata = {
  title: 'Login Page',
  description: 'Join us for Latest update Free/पैड PDFs of current Affairs',
  alternates:{
    canonical: `/login`
  },
}

function Login() {
  return (
    <div className="mx-auto py-[4rem]">
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
