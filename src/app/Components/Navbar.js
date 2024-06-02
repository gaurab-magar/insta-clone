'use client'
import React, { useEffect, useRef } from 'react'
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

import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const Navbar = () => {
  const {data: session} = useSession();
  const [isOpen, setIsOpen] = useState(false);

  //for file
  const [selectedFile , setSelectedFile] = useState(null);
  const [imageFileUrl , setImageFileUrl] = useState(null);
  const [uploadingImgFile , setUploadingImgFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  const filePickerRef = useRef(null);

  function addImageToPost (e){
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file) {
      if (file.size > maxSize) {
        setErrorMessage('File size is too large. Please select a file smaller than 2MB.');
        setSelectedFile(null);
        setImageFileUrl(null);
      } else {
        setErrorMessage('');
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    }
  }

  
  useEffect(()=>{
    if (selectedFile){
      uploadImageToStorage()
      }
  },[selectedFile])

  async function uploadImageToStorage(){
    setUploadingImgFile(true);
    const storage = getStorage(app)
    const fileName = new Date().getTime() + '-' +
    selectedFile.name;
    const storageRef = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef,selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
          setUploadingImgFile(false);
          setImageFileUrl(null);
          setSelectedFile(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
              setUploadingImgFile(false);
              console.log('File available at', downloadURL);
              });
              }
    )
  }
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
          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false}  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  md:w-[30%] w-[80%] flex flex-col items-center justify-center gap-5 bg-white p-5 rounded-md shadow-2xl border-none outline-none">
            <button onClick={() => setIsOpen(false)} className='absolute top-3 right-3 focus:scale-110 hover:scale-110 duration-200' >
              <IoIosCloseCircle className='text-pink-700 text-2xl' />
            </button>
            <div className='h-30 overflow-hidden rounded-md'>
              {
                selectedFile ? (
                    <Image src={imageFileUrl} alt="image" className={`max-h-[250px] w-full object-contain ${uploadingImgFile ? 'animate-pulse': ''}`} width={300} height={100} />
                ):(
                  <IoIosCamera className='text-4xl w-full border' onClick={()=>filePickerRef.current.click()} />
                )
              }
            </div>
            <input hidden ref={filePickerRef} type='file' accept='image/*' onChange={addImageToPost} />
            <input type='text' className='focus:outline-none text-center m-4 w-full' placeholder='Please enter your caption..' maxLength='150' />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button disabled className='w-full rounded-md shadow-xl disabled:bg-pink-200 font-semibold bg-pink-600 text-white py-1 hover:brightness-105 '>Upload Post</button>
          </Modal> 
        }
    </header>
  )
}

export default Navbar

