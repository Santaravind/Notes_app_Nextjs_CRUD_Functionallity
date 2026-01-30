// import mongoose from "mongoose";
import dbConnection from "../../../../lib/db";
import Note from "../../../../model/Note";
import { NextResponse } from "next/server";

 
export async function GET() {
try {
    await dbConnection()
    const notes=await Note.find({}).sort({createAt:-1})
    
    return NextResponse.json({
        success:true,
        data:notes
    })
} catch (error) {

     return NextResponse.json({
        success:false,
       error: error.message

    },{
        status:400
    })
    
}    
}


// export async function POST(request) {
// try {
//     await dbConnection();
//     const body=await request.json();
//     const note =await Note.create(body);

//     return NextResponse.json({
//         success:true,
//         data:note
//     },{
//         status:201
//     })
// } catch (error) {
//     return NextResponse.json({
//         success:false,
//        error: error.message

//     },{
//         status:400
//     })
// }
    
// }
export async function POST(request) {
  try {
    await dbConnection();

    const body = await request.json();
    const { title, content } = body;

    // ✅ server-side validation
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = await Note.create({
      title: String(title),
      content: String(content),
    });

    return NextResponse.json(
      { success: true, data: note },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/notes ERROR 👉", error); // 👈 MUST SEE THIS
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

