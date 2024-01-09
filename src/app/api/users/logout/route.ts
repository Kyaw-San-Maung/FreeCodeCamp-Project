import { NextResponse } from "next/server";
import { rule } from "postcss";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: 'Logout Success',
            sucess: true
        });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

        //dun forget to do return the response
        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:400})
    }
}