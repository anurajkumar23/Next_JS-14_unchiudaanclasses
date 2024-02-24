import signupImg from "../../../public/Images/signup.webp"
import Template from "../login/Template"


export const metadata = {
  title: 'Signup Page',
  description: 'Join us for Latest update Free/पैड PDFs of current Affairs',
  alternates:{
    canonical: `/signup`
  },
}


function Signup() {
  return (
    <div className="mx-auto py-[4rem]">
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