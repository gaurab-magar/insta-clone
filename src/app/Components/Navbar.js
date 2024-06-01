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
          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} className="max-w-lg  absolute top-52 left-52 w-[90%]  flex flex-col items-center justify-center gap-5 bg-white p-5 rounded-md shadow-md">
            <h2>Modal is open!</h2>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </Modal>
        }
    </header>
  )
}

export default Navbar

