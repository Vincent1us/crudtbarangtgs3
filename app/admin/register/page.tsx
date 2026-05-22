"use client"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { BASE_API_URL } from "@/global"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const url = `${BASE_API_URL}/auth/register`

      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("role", "user")
      formData.append("password", password)

      const res = await axios.post(url, formData)
      const data = res.data

      if (data.status === true) {
        toast("Register berhasil 🎉", {
          type: "success",
          autoClose: 2000
        })

        setTimeout(() => {
          router.push("/user/login")
        }, 1500)
      } else {
        toast(data.message, { type: "error" })
      }
    } catch (error: any) {
      console.log(error)
      toast("Register gagal 😭", { type: "error" })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen 
    bg-gradient-to-t from-[#2f4f4f] via-[#cfe3df] via-35% to-white to-60%">

      <ToastContainer />

      <div className="w-[540px] p-10 rounded-3xl shadow-2xl
      bg-[#f4ecd8] border-4 border-[#d6c3a3]">

        <h1 className="text-3xl font-bold text-center mb-8 text-[#2f4f4f]">
          Register Account
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-[#2f4f4f] mb-2 font-medium">
              Nama
            </label>
            <input
              type="text"
              placeholder="Masukkan nama"
              className="w-full p-4 rounded-xl 
              bg-white border border-[#cdb892] 
              focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="block text-[#2f4f4f] mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full p-4 rounded-xl 
              bg-white border border-[#cdb892] 
              focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-7">
            <label className="block text-[#2f4f4f] mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full p-4 rounded-xl 
              bg-white border border-[#cdb892] 
              focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            className="w-full p-4 rounded-xl text-white font-semibold text-lg
            bg-[#2f4f4f] hover:bg-[#3f6f6f] transition-all duration-300 shadow-md">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-[#5a4633]">
          Sudah punya akun?{" "}
          <Link href="/user/login" 
          className="text-[#2f4f4f] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage