"use client";
import React, { useState } from "react";
import img from "../../../assets/pexels-mikhail-nilov-6894103.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "@/Atoms/userAtom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate=useNavigate()
 let [token,setToken]= useRecoilState(userAtom)
  async function handleSubmit(values) {
    try {
      setLoading(true);
      let res = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      setMsg(res.data?.msg);
      if (res.data?.msg=="done") {
        localStorage.setItem("Token",res.data.token)
        setToken(res.data.token)
        setTimeout(()=>{
        navigate("/home")
        },2000)
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setMsg(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-gray-50">
      <div className="order-1 md:order-2 flex items-center justify-center p-6">
        <img
          src={img}
          alt="Login illustration"
          className="w-full max-w-xl md:max-w-2xl object-cover rounded-2xl shadow-2xl"
        />
      </div>

      <div className="order-2 md:order-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login Now
          </h2>

          {msg && (
            <div
              className={`p-4 mb-4 rounded-xl text-center font-medium transition-all duration-300 ${
                msg.toLowerCase().includes("done")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {msg}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="font-medium">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="h-12 text-base"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="h-12 text-base"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/Authuncation/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
