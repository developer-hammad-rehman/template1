import { client } from "@/sanity/lib/client";
import {  NextResponse } from "next/server";

export async function GET() {
    const data = await client.fetch(`
        *[_type=="products"]{
  _id,
  name,
    description,
    price,
    "imageUrl" : image.asset->url,
  category
}
    `);
    return NextResponse.json(data);
}