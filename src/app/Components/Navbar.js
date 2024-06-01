'use client'
import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaUser } from "react-icons/fa";
import Input from './ui/Input';
import { LuSend } from "react-icons/lu";
import { signIn, useSession , signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import  Modal  from 'react-modal';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosCamera } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

const Navbar = () => {
  const {data: session} = useSession();
  const [isOpen, setIsOpen] = useState(false);
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
      <div>
      {session ? (
            <div className='flex items-center justify-center gap-3'>
              <IoIosAddCircleOutline onClick={()=> setIsOpen(true)} className='text-3xl text-pink-600 hover:scale-110 duration-150' />
              <button type="button" onClick={() => signIn()}>
                <div className="rounded-full overflow-hidden">
                  <Image onClick={()=>signOut()} src={session.user.image} alt={session.user.name} width={40} height={40} />
                </div>
               </button>
            </div>
          ) : (
            <FaUser className="text-xl" />
          )}
      </div>
        {
          isOpen && 
          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false}  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  md:w-[30%] w-[80%] flex flex-col items-center justify-center gap-5 bg-white p-5 rounded-md shadow-2xl border-none">
            <button onClick={() => setIsOpen(false)} className='absolute top-3 right-3 focus:scale-110 hover:scale-110 duration-200' >
              <IoIosCloseCircle className='text-pink-700 text-2xl' />
            </button>
            <IoIosCamera className='text-4xl' />
            <p>Please enter your caption..</p>
            <button className='w-full rounded-md font-semibold bg-pink-600 text-white py-1 '>Upload Post</button>
          </Modal>
        }
    </header>
  )
}

export default Navbar

