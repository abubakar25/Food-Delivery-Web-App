import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const data = await restaurantSchema.find();

  return NextResponse.json({ result: data });
  // return NextResponse.json({ result: true });
}

export async function POST(request) {
  let payload = await request.json();
  // console.log("payload", payload);
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let result;

  if (payload.login) {
    // write code for login
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
  } else {
    // write code for signup
    const restaurant = new restaurantSchema(payload);

    result = await restaurant.save();
  }

  return NextResponse.json({ result, success: true });
}
