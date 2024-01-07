import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json
        const { username, email, password } = reqBody;

        console.log(reqBody);

        //check user is exist
        const user = await User.findOne({ email })
        
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status:400})
        }

        //hash password
        
        

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, {status:500})
        
    }
}