import { auth } from "@clerk/nextjs";
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

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST] Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page'))||  0;
    const search = searchParams.get('search') ?? '';
    const key = searchParams.get('key') ?? '';

    const totalProducts = await Product.countDocuments({});
    let query: { [key: string]: any } = {};

    if (search) {
      if (key === 'title') query = { title: { $regex: search, $options: 'i' } };
      if (key === '_id' || isValidObjectId(search)) query = { _id: search };
      if (key === 'category') query = { category: { $regex: search, $options: 'i' } };
    }
    const products = await Product.find(query)
      .sort({ createdAt: 'desc' })
      .skip(page * 10)
      .limit(10)
      .populate({ path: 'collections', model: Collection })
      .select("-reviews -media -ratings -numOfReviews -description -variants");

    return NextResponse.json({
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / 10),
    }, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

