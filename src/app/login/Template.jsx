/* eslint-disable react/prop-types */
import Image from "next/image";
import frameImg from "../../../public/Images/frame.png"
import LoginForm from "./LoginForm";
import SignupForm from "../signup/SignupForm";


function Template({ title, description1, description2, image, formType }) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 mt-[80px]">
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem]">
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-[#AFB2BF] font-medium">{description1}</span>{" "}
            <span className="font-edu-sa font-bold italic text-[#47A5C5]">
              {description2}
            </span>
          </p>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}

          {/* <button className="mt-6 rounded-[8px] bg-red-500 py-[8px] px-[12px] font-medium text-[#000814] duration-500 hover:scale-[1.1]">SignIN with Google</button> */}
        </div>
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <Image
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <Image
            src={image}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
          />
        </div>
      </div>
    </div>
  );
}

export default Template;
