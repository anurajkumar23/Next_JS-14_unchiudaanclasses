"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import "./quiz.css";
import { useGetUserQuery } from "../../redux/slices/userSlices";
import PatchAffairsForm from "./AffairsPatchForm";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import he from "he";



export default function CurrentaffairsId() {
  const [affairDetailsData,setAffairDetailsData] =useState()
  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.unchiudaanclasses.com/api/currentaffairs/${id}`
        );
        setAffairDetailsData(response.data.data.affairs);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const { data: userData} = useGetUserQuery();
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


  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});


  if (!affairDetailsData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (
    questionIndex,
    selectedOptionIndex,
    correctOptionIndex
  ) => {
    const isCorrect = selectedOptionIndex.toString() === correctOptionIndex;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOptionIndex,
    }));

    setFeedback((prev) => ({
      ...prev,
      [questionIndex]: isCorrect ? "correct" : "incorrect",
    }));
  };
  const decodeHtmlEntities = (html) => {
    return he.decode(html);
  };
  

  return (
    <div>
     <h1 className="mt-10 text-[1.3rem] font-[550] text-center">
          <span dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(affairDetailsData.topic) }} />  
          </h1>
          <div className="md:mx-12 my-5">
            <Image
              width={500}
              height={500}
              alt={`${affairDetailsData.photo}`}
              src={`https://api.unchiudaanclasses.com/img/affairs/${affairDetailsData.photo}`}
              className="w-full mx-auto rounded-lg"
            />
          </div>
          {/* <SocialMedia /> */}

          <h1 className="text-center font-bold text-[2rem] md:text-[2.5rem] mb-6 ">
            Current Affairs {affairDetailsData.category}
          </h1>
          <p className="mt-4 text-justify text-lg">
          <span dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(affairDetailsData.description) }} />
          </p>
          <div className="flex justify-between mt-10 ">
            <span className="text-center text-md ">Share with Friends :</span>
            <span className="flex text-gray-400 justify-center space-x-4">
              <a className=" " href="" target="_blank" rel="noreferrer">
                <FaFacebook className="text-blue-500 w-7 h-7" />
              </a>

              <a className=" " href="" target="_blank" rel="noreferrer">
                <FaTwitter className="text-blue-400 w-7 h-7" />
              </a>

              <a className=" " href="" target="_blank" rel="noreferrer">
                <FaInstagram className="text-pink-500 w-7 h-7" />
              </a>

              <a className=" " href="" target="_blank" rel="noreferrer">
                <FaLinkedin className="text-blue-600 w-7 h-7" />
              </a>
              <a className=" " href="" target="_blank" rel="noreferrer">
                <FaWhatsapp className="text-green-500 w-7 h-7" />
              </a>
            </span>
          </div>
      {affairDetailsData.data.length > 0 && (
        <div>
          <h1 className="mt-10 text-lg font-bold text-center">
            Daily Quiz / डेली प्रश्न
          </h1>

          <div className="faq-container rounded-lg mt-4 w-[100%]">
            {affairDetailsData.data.map((question, index) => (
              <div key={question._id} className="faq-question">
                <h3>
                  सवाल {index + 1}: {question.ques}
                </h3>
                <div>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="radio"
                        id={`question_${index}_option_${optionIndex}`} // Unique id
                        name={`question_${index}`}
                        value={optionIndex + 1}
                        onChange={() =>
                          handleAnswerChange(
                            index,
                            optionIndex + 1,
                            question.ans
                          )
                        }
                      />
                      <label
                        htmlFor={`question_${index}_option_${optionIndex}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedAnswers[index] !== undefined && (
                  <>
                    <div
                      className={`font-bold mt-2 ${
                        feedback[index] === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[index] === "correct"
                        ? "Correct Answer!"
                        : "Wrong Answer!"}
                      <br />
                    </div>
                    <p>
                      {" "}
                      Correct Answer: {question.options[question.ans - 1]}{" "}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {role ? <PatchAffairsForm details={affairDetailsData} /> : ""}
    </div>
  );
}
