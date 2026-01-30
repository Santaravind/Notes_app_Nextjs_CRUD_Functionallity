import { NextResponse } from "next/server";
import dbConnection from "../../../../../lib/db";
import Note from "../../../../../model/Note";


export async function PUT(request, {params}) {
    try {
        const {id}=await params;
        await dbConnection();
        const body=await request.json();

        const note=await Note.findByIdAndUpdate(
            id,
          {...body,updateAt:new Date()},
          
        )
         if(!note){
            return NextResponse.json({
                success:false,
                error:"Note not found"
            },
        {status:404})
        }

        return NextResponse.json({
            success:true,
            data:note
        })

    } catch (error) {
         return NextResponse.json({
            success:false,
            error:error.message
        },
    {status:404})
    }
    
}




export async function DELETE(request ,{params}) {

    try {
        const {id}=await params;
        await dbConnection();
        const note=await Note.findByIdAndDelete(id);

        if(!note){
            return NextResponse.json({
                success:false,
                error:"Note not found"
            },
        {status:404})
        }
        return NextResponse.json({
            success:true,
            data:({})
        })

        
    } catch (error) {
        return NextResponse.json({
            success:false,
            error:error.message
        },
    {status:404})
        
    }

    
}