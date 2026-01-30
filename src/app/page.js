
import React from 'react'
import dbConnection from '../../lib/db'
import NotesClient from '../../components/NotesClient'
import Note from '../../model/Note'
import { Toaster } from 'react-hot-toast'


async function getNotes() {
   await dbConnection()
  const notes=await Note.find({}).lean()

  return notes.map((note)=>({
    ...note,
    _id:note._id.toString()
    

  }))
  
}

async function Home() {

  const notes=await getNotes();
  // console.log(notes)
  
  return (
    <>
    <h1 className='text-6xl text-center bg-pink-200 font-bold p-4'>Note App  </h1>
    <div className='min-h-screen flex flex-col  items-center  bg-pink-200'>
          <Toaster/>
          <NotesClient previousNotes={notes}/>
    </div>
   
    </>
  )
}

export default Home 
