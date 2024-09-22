import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";
import { isValidObjectId } from "mongoose";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
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
      !stock ) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }


    const newProduct = new Product({
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
    const page = parseInt(searchParams.get('page') ?? '0', 10);
    const search = searchParams.get('search') ?? '';
    const id = searchParams.get('id') ?? '';

    const totalProducts = await Product.countDocuments({});
    let query: { $or?: { [key: string]: any }[] } = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, 
        { category: { $regex: search, $options: 'i' } }, 
      ];
    }

    if (isValidObjectId(id)) {
      query.$or = query.$or || [];
      query.$or.push({ _id: id });
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

