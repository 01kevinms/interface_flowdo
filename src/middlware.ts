import { NextResponse } from "next/server";

 export function middlware(req:Request){

    return NextResponse.next
 }