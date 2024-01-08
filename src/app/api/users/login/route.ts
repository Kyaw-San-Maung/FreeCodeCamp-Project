
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);
        

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({error: "User does  not exists."}, {status:400})
        }

        //check password is correct or not
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({error: "Invalid password"}, {status:400})
        }

        //check token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token (! menaning that i tell the server i am sure that data will come dun worry about that i will take care of it.)
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
           
        })

        return response;

    } catch (error:any) {
        console.log("Login Failed", error.message);
        return NextResponse.json({error: error.message}, {status:500})
        
    }
}

