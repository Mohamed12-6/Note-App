"use client";
import React, { useState } from "react";
import img from "../../../assets/pexels-mikhail-nilov-6962993.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false); // ✅ حالة التحميل
  const navigate=useNavigate()

  async function handleSubmit(values) {
    try {
      setLoading(true);
      let res = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );
 if (res.data?.msg?.toLowerCase().includes("done")) {
        setTimeout(() => {
          navigate("/Authuncation/login");
        }, 2000);
      }
      setMsg(res.data?.msg);
    } catch (error) {
      setMsg(error.response?.data?.msg);
    } finally {
      setLoading(false); // ✅ وقف التحميل بعد الانتهاء
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required")
      .positive()
      .integer(),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]{10,15}$/, "Invalid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-gray-50">
      {/* Image */}
      <div className="flex items-center justify-center p-6">
        <img
          src={img}
          alt="Register illustration"
          className="w-full max-w-xl md:max-w-2xl object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Register Now
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
            {/* Username */}
            <div>
              <label className="font-medium">Username</label>
              <Input
                name="name"
                placeholder="Enter your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="h-12 text-base"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
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

            {/* Password */}
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
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="font-medium">Age</label>
              <Input
                name="age"
                type="number"
                placeholder="Enter your age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                className="h-12 text-base"
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm">{formik.errors.age}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium">Phone</label>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="h-12 text-base"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            {/* Submit with Loading */}
            <Button
              type="submit"
              disabled={loading} // ⛔ يمنع الضغط أثناء التحميل
              className={`w-full h-12 text-lg font-semibold transition-all duration-300 
                ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/Authuncation/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
