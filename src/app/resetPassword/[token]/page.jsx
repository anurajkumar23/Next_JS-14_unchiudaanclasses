"use client"
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ResetSchema } from "../../signup/formvalidator";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'

function ResetPassword() {
  const router = useRouter();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Changed the variable name for consistency


  const initialValues = { password: "", confirmPassword: "" }; // Changed the variable name to match the form field

  const resetPassword = async (userData, token) => {
    try {
      const response = await fetch(
        `https://api.unchiudaanclasses.com/api/user/resetPassword/${token}`, // Changed axios to fetch
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  const {
    errors,
    handleBlur,
    handleSubmit,
    values,
    handleChange,
    isValid,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: ResetSchema,
    onSubmit: async (values) => {
      try {
        await resetPassword(
          {
            password: values.password,
          },
          token
        );
        router.push("/login"); // Redirect on successful reset
      } catch (error) {
        console.error("Reset password error:", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <h2 className="text-2xl mb-6 text-center">Reset Password</h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="relative block mb-1 text-sm font-bold">
              New Password <span className="text-[#EF476F]">*</span>
            </label>
            <div className="relative rounded-[0.5rem] bg-[#E6E6E6]">
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your Password"
                className="w-full p-3 pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2/4 transform -translate-y-2/4 z-10 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            {errors.password && touched.password && (
              <p className="font-semibold text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="relative block mb-1 text-sm font-bold">
              Confirm Password <span className="text-[#EF476F]">*</span>
            </label>
            <div className="relative rounded-[0.5rem] bg-[#E6E6E6]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="off"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm Your Password"
                className="w-full p-3 pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-2/4 transform -translate-y-2/4 z-10 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="font-semibold text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full md:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isValid ? "Submit" : "❌Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
