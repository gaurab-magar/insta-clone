'use client'
import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaUser } from "react-icons/fa";
import Input from './ui/Input';
import { LuSend } from "react-icons/lu";
import { signIn, useSession , signOut } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const {data: session} = useSession();
  console.log(session)
  return (

    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 border-b shadow-md sticky gap-5 ">
      <Link className="" href="/">
        <FaInstagram className="text-2xl text-pink-600"/>
      </Link>
      <div className="flex items-center justify-center w-2/3 md:w-1/3  relative">
        <Input placeholder='Write a caption...' id="search" type="text"  />
        <button className="absolute right-5" >
          <LuSend className="text-xl text-pink-500" />
        </button>
      </div>
      <button type="button" onClick={() => signIn()}>
        {session ? (
          <div className="rounded-full overflow-hidden">
            <Image onClick={()=>signOut()} src={session.user.image} alt={session.user.name} width={40} height={40} />
          </div>
        ) : (
          <FaUser className="text-xl" />
        )}
    </button>
      {/* <nav className="hidden items-center gap-4 md:flex">
        <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
          Services
        </Link>
        <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
          Contact
        </Link>
      </nav> */}
    </header>
  )
}

export default Navbar

