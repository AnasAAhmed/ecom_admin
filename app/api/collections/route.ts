import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Collection from "@/lib/models/Collection";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  try {
    const { userId, sessionClaims } = auth();

    if (!userId && sessionClaims?.metadata.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB()

    const { title, description ,image} = await req.json()
    const existingCollection = await Collection.findOne({ title })
    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 })
    }

    if (!title||!image ) {
      return new NextResponse("Title and image are required", { status: 400 })
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    })

    await newCollection.save()
    revalidatePath('/products/new');
    return NextResponse.json(newCollection, { status: 200 })
  } catch (err) {
    console.log("[collections_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const collections = await Collection.find().sort({ createdAt: "desc" })

    return NextResponse.json(collections, { status: 200 })
  } catch (err) {
    console.log("[collections_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
