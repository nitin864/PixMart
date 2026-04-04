import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest){
    const {pathname} = req.nextUrl
    const publicRoutes = ["/login" , "/register" , "api/auth", "/favicon.ico","/_next"] 

    if(publicRoutes.some((path)=>pathname.startsWith(path))){
        return NextResponse.next()
    }

    const token = getToken({req, secret:process.env.AUTH_SECRET})
        console.log(token)
    
} 