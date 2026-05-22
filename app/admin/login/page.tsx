"use client"
import Link from "next/link";
import { BASE_API_URL } from '@/global';
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { storeCookie } from "@/lib/client-cookies";

type responseLogin = {
  status: boolean
  message: string
  token: string
  user: {
    id: number
    nama_user: string
    email: string
    role: string
  }
}

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const url = `${BASE_API_URL}/auth/login`

      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      const response = await axios.post(url, formData)
      const data: responseLogin = response.data

      if (data.status === true) {
        storeCookie("token", data.token)

        // DEBUG (boleh dihapus nanti)
        console.log("ROLE:", data.user.role)

        if (data.user.role === "admin") {
          toast(data.message, {
            hideProgressBar: true,
            containerId: `toastLogin`,
            type: "success",
            autoClose: 2000
          })

          setTimeout(() => {
            router.replace("/admin/dashboard")
          }, 1000)
          return
        }

        if (data.user.role === "user") {
          toast(data.message, {
            hideProgressBar: true,
            containerId: `toastLogin`,
            type: "success",
            autoClose: 2000
          })

          setTimeout(() => {
            router.replace("/user/dashboard")
          }, 1000)
          return
        }

        // kalau role tidak dikenal
        toast('Role tidak dikenali', {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "warning",
          autoClose: 2000
        })

        setTimeout(() => {
          router.replace("/admin/login")
        }, 1000)
        return

      } else {
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "error"
        })
      }

    } catch (error) {
      console.log(error)
      toast(`Login gagal`, {
        hideProgressBar: true,
        containerId: `toastLogin`,
        type: "error"
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen 
    bg-gradient-to-t from-[#2f4f4f] via-[#cfe3df] via-35% to-white to-60%">

      <ToastContainer containerId={`toastLogin`} />

      <div className="w-[540px] p-10 rounded-3xl shadow-2xl
      bg-[#f4ecd8] border-4 border-[#d6c3a3]">

        <h1 className="text-3xl font-bold text-center mb-8 text-[#2f4f4f]">
          Login Account
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-[#2f4f4f] mb-2 font-medium">
              Email
            </label>
            <input
              className="w-full p-4 rounded-xl 
              bg-white border border-[#cdb892] 
              focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
              type="text"
              placeholder="Masukkan email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-7">
            <label className="block text-[#2f4f4f] mb-2 font-medium">
              Password
            </label>
            <input
              className="w-full p-4 rounded-xl 
              bg-white border border-[#cdb892] 
              focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
              type="password"
              placeholder="Masukkan password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full p-4 rounded-xl text-white font-semibold text-lg
            bg-[#2f4f4f] hover:bg-[#3f6f6f] transition-all duration-300 shadow-md"
            type="submit"
          >
            Login
          </button>

          <p className="mt-6 text-center text-[#5a4633]">
            Belum punya akun?{" "}
            <Link
              href="/admin/register"
              className="text-[#2f4f4f] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;