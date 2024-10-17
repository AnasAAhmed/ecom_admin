import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";
import { isValidObjectId } from "mongoose";
import { slugify } from "@/lib/utils";

export const POST = async (req: NextRequest) => {
  try {
    const { userId, sessionClaims } = auth();

    if (!userId && sessionClaims?.metadata.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      variants,
      stock,
      price,
      expense,
    } = await req.json();


    if (
      !title ||
      !description ||
      !media ||
      !category ||
      !price ||
      !stock) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }


    const newProduct = new Product({
      title,
      description,
      slug: slugify(title),
      media,
      category,
      collections,
      tags,
      variants,
      stock,
      price,
      expense,
    });

    await newProduct.save();

    if (collections && Array.isArray(collections)) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }
    await fetch(`https://ecom-store-anas.vercel.app/api/revalidate?path=/&secret=pandu-boom`, {
      method: "POST",
    });
    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST] Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

