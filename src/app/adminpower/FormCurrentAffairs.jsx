"use client"
import { useState, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const postaffairs = async (affairsData) => {
  const token = localStorage.getItem("jwt_token");

  const formData = new FormData();


  formData.append("topic", affairsData.topic);
  formData.append("category", affairsData.category);
  formData.append("description", affairsData.description);

  formData.append("data", JSON.stringify(affairsData.data));
  formData.append("photo", affairsData.photo);
  formData.append("set_no", affairsData.set_no);
  let loadingToast;
  try {
    loadingToast = toast.loading("Posting CurrentAffairs...");
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/currentaffairs`,
      formData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    toast.dismiss(loadingToast);
    toast.success("CurrentAffairs posted successfully!");
  } catch (error) {
    console.error(error);
    toast.dismiss(loadingToast);
    toast.error("Error posting CurrentAffairs. Please try again.");
  }
};

const FormCurrentAffairs = () => {
  const topicEditor = useRef(null);
  const descriptionEditor = useRef(null);

  const initialFormData = {
    topic: "",
    category: "",
    set_no: "",
    description: "",
    photo: null,
    data: [{ ques: "", options: ["", "", "", ""], ans: "" }],
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleEditorChange = (field, newContent) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: newContent,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const newFormData = [...formData.data];
    newFormData[questionIndex].options[optionIndex] = value;

    setFormData({
      ...formData,
      data: newFormData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formdata = formData.data
    if(formData.data[0].ques===""){
      formdata=[]
    }
    console.log(formdata)

    try {
      await postaffairs({
        topic: formData.topic,
        category: formData.category,
        set_no: formData.set_no,
        data: formdata,
        photo: formData.photo,
        description: formData.description,
      });

      // Reset the form data to its initial values after successful submission
      setFormData({ ...initialFormData });

      // Optionally, you can clear the JoditEditor content
      if (topicEditor.current) {
        topicEditor.current.value = "";
      }
      if (descriptionEditor.current) {
        descriptionEditor.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Error posting CurrentAffairs. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };
  return (
    <div>
      <form className="mx-auto mt-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="topic"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Topic
          </label>
          <JoditEditor
            ref={topicEditor}
            type="text"
            id="topic"
            name="topic"
            onBlur={(content) => handleEditorChange("topic", content)}
            onChange={(content) => {}}
            value={formData.topic}
            // onChange={(e) =>
            //   setFormData({ ...formData, topic: e.target.value })
            // }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a category</option>
            <option value="BiharDaroga">Bihar Daroga</option>
            <option value="BPSC">BPSC</option>
            <option value="Railway">Railway</option>
            <option value="UPSC">UPSC</option>
            <option value="SSC">SSC</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-800">Set No</label>
          <input
            type="number"
            name="set_no"
            value={formData.set_no}
            onChange={handleChange}
            className="border p-2 w-full text-black"
            required
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block mb-2 text-gray-700">Description</label>
          <JoditEditor
            name="description"
            value={formData.description}
            onBlur={(content) => handleEditorChange("description", content)}
            onChange={(content) => {}}
            className="border p-2 w-full h-32"
          ></JoditEditor>
        </div>
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Questions Section */}
        {formData.data.map((question, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`ques${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Question {index + 1}
            </label>
            <input
              type="text"
              id={`ques${index}`}
              name="ques"
              value={question.ques}
              onChange={(e) => handleChange(e, index)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <label>Option: {optionIndex + 1}</label>
                <input
                  type="text"
                  id={`option${index}-${optionIndex}`}
                  name="option"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index, optionIndex)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
            <label
              htmlFor={`ans${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Answer {index + 1} <br />
              *please put option Number only
            </label>
            <input
              type="text"
              id={`ans${index}`}
              name="ans"
              value={question.ans}
              onChange={(e) => handleChange(e, index)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <span className="flex space-x-6">
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                data: [
                  ...formData.data,
                  { ques: "", options: ["", "", "", ""], ans: "" },
                ],
              })
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </span>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default FormCurrentAffairs;