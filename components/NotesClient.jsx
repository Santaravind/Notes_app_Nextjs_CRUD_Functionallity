"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function NotesClient({ previousNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNotes] = useState(previousNotes);

  const [editId, setEditId]=useState(null);
  const [editTitel,setEdittitle]=useState("")
  const[editContent,seteditContent]=useState("")




  // const SaveData=async (e)=>{
  //   e.preventDefault();
  //   // if(!title.trim()|| !content.trim()) return;

  //   setContent(true);
  //   try {
  //     const reponse=await fetch("http://localhost:3000/app/notes",{
  //       method:"POST",
  //       headers:{"Content-type":"application/json"},
  //       body:JSON.stringify({title,content})
  //     })
  //     const result=await reponse.json()
  //     console.log(result)
  //     setLoading(false)

  //   } catch (error) {
  //     console.error("Error create note",error)

  //   }

  // }

  const SaveData = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    try {
      // const response = await fetch("http://localhost:3000/api/notes", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ title, content }),
      // });

      //this for deployement 
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();
    //   console.log(result);
      toast.success("Content create !!");

           setNotes((prevNotes) => [result.data, ...prevNotes]);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error create note", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotes= async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method:"DELETE",
      });
      const result = await response.json();

      if (result.success) {
        setNotes(note.filter((note) => note._id !== id));
        toast.success("Notes Deleted succesfully !!!");
      }
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  const startEdid=(note)=>{
    setEditId(note._id);
    setEdittitle(note.title);
    seteditContent(note.content);
  }
const concelEdit=()=>{
  setEditId(null)
  setEdittitle("");
    seteditContent("");

}

const updateNote=async (id)=>{
  if(!editTitel.trim()||!editContent.trim())return;

  setLoading(true)
  try {
    const response =await fetch(`/api/notes/${id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        title:editTitel,content:editContent

      })
      
    })
    const result=await response.json()

    if(result.success){
      toast.success("Data udated successfully !!!")
      setNotes(note.map((note)=>(note._id===id?result.data:note)))
      setEditId(null)
      setEdittitle("")
      seteditContent("")
    }
    setLoading(false)
    
  } catch (error) {
    toast.error("Some error ours !!!")
    console.log("Error in updating",error)
  }


}

  return (
    <>
      {/* <div className='min-h-screen mx-auto  bg-gray-700'> 
        <h1 className='text-3xl text-center font-semibold p-3' >Notes App</h1>
        <div className='space-y-6 grid items-center justify-center mt-4 border-0'>
          <form action="">
              <div className='mt-2 '>
                <input type="text"
            placeholder='Enter your titel'
            className='text-white text-2xl focus:none focus:ring-1 focus:ring-pink-200 p-2 rounded-lg  '
              />
              </div>

              <div>
                 <textarea 
              type="text"
              placeholder='Write your text content'
              className='p-4  text-lg text-white focus:none'

              />
              </div>
              

          </form>

        </div>
      </div> */}
      <div className="space-y-6 max-w-5xl items-center justify-center">
        <form
          action=""
          onSubmit={SaveData}
          className="bg-linear-to-r to-purple-300 from-pink-300 via-20%  p-6 rounded-lg shadow-md"
        >
          <h1 className="text-xl text-gray-800 font-semibold mb-4 text-center ">
            {" "}
            Create New Note{" "}
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border-gray-400 
            bg-blue-50
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full p-3 border-gray-400 bg-gray-50
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-400 rounded-lg text-white font-semibold hover:bg-pink-500"
            >
              {loading ? "creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
      <div className="ml-4 bg-linear-to-r to-purple-300 from-pink-300 via-20% shadow rounded-2xl max-w-4x w-4xl p-4 mt-4 ">
        <h1 className="text-2xl font-semibold text-center">
          Your notes :{note.length}
         
        </h1>
        <div>
            
        </div>
        <div>
          {note.map((n) => (
            <div key={n._id} className="p-3">
              
                {
                  editId===n._id?(<> 
                     <div className="space-y-4">
                         <input
              type="text"
              placeholder="note title"
              value={editTitel}
              onChange={(e) => setEdittitle(e.target.value)}
              className="w-full p-3 border-gray-400 
            bg-blue-50
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Note Content"
              value={editContent}
              onChange={(e) => seteditContent(e.target.value)}
              rows={4}
              className="w-full p-3 border-gray-400 bg-gray-50
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    <div className="flex gap-2 ">
                      <button 
                      onClick={()=>updateNote(n._id)}
                      className="bg-blue-700 text-2xl px-3 py-2 font-bold text-white rounded-lg shadow-fuchsia-50">
                        {loading?"Saving...":"Save"}
                      </button>
                      <button
                      onClick={concelEdit}
                      className="bg-red-400 text-2xl font-semibold px-3 py-2 text-black rounded-lg shadow-fuchsia-50">
                       Cancel
                      </button>

                    </div>
                     </div>
                   


                  </>):(<> 
                   <ul className="bg-linear-to-r from-pink-300 via-red-100  p-3 mt-2  rounded-2xl shadow-2xl">
                <li className="text-2xl font-semibold text-black">{n.title}</li>
                <li className="text-xl font-light text-gray-500 ">
                  {n.content}
                </li>
                <button 
                 className="
    text-white mt-1 ml-5 font-bold
    bg-linear-to-r from-purple-600 via-purple-300 to-red-300
    hover:from-purple-600 hover:via-red-400 hover:to-green-500
    px-3 py-2 rounded-lg shadow
    hover:cursor-pointer
    transition-all duration-300
  "
                onClick={()=>startEdid(n)}
                >
                  Update
                </button>
                <button
                  className="
    text-blue-600 text-lg mt-1 ml-5 font-bold
    bg-linear-to-r from-purple-600 via-purple-300 to-red-300
    hover:from-red-600 hover:via-red-400 hover:to-red-800
    px-3 py-2 rounded-lg shadow
    hover:cursor-pointer hover:text-gray-600 transform
    transition-all duration-300
  "
                  onClick={() => deleteNotes(n._id)}
                >
                  Delete
                </button>
              </ul>
                  </>)
                }
               
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default NotesClient;
