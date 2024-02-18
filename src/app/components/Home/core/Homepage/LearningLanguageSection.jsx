// import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "./Button";
import Know_your_progress from "../../../../../../public/Images/Know_your_progress.png"
import Compare_with_others from "../../../../../../public/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../../../../public/Images/Plan_your_lessons.png";
import Image from 'next/image';

const LearningLanguageSection = () => {
  return (
    <div>
        <div className="text-4xl font-semibold text-center my-10">
        ऊँची उड़ान
            <HighlightText text={"Gateway to success"} />
            <div className="text-center text-[#2C333F] font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
            Current Affairs for UPSC, BPSC, All State PCS, बिहार दारोगा,SI, BSSC, Railway, JSSC, SSC(CGL, CPO, GD) BANKING, Defence, Police,KVS,CTET और अन्य Competitive और Government Job Examinations 
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
              <Image
                src={Know_your_progress}
                alt=""
                className="object-contain  lg:-mr-32 "
              />
              <Image
                src={Compare_with_others}
                alt=""
                className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
              />
              <Image
                src={Plan_your_lessons}
                alt=""
                className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
              />
            </div>
          </div>

          <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>
    </div>
  )
}

export default LearningLanguageSection