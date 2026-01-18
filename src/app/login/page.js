"use client";
import axios from 'axios';
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const LoginPage = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/login", {
                email, password
            })
            console.log("logged in successfully", response)
            router.push("/profile")
        } catch (error) {
            console.log("failed to login",error)
        }
    }
    return (
        <div className='mx-40 flex justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className='rounded-md bg-white/5 flex flex-col justify-center items-center w-2xl mx-auto border-b border-white/10 pb-12'
            >
                <h1 className='text-2xl mt-10'>Login</h1>



                <div className="col-span-full w-80 my-3">
                    <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                        email
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="col-span-full w-80 my-3">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                        password
                    </label>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className=" cursor-pointer mt-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:text-black"
                >
                    Login
                </button>

                <div>
                    Don't have an account?<Link href="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
