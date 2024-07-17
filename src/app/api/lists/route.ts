import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { List } from "@/types/list.type";

// Get all lists
export const GET = async (req: NextRequest) => {
  try {
    const { data } = await axios.get<List[]>(
      `${process.env.MOCKAPI_URL}/lists`,
      {
        params: {
          sortBy: "id",
          order: "desc",
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};

// Create list
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { data } = await axios.post<List>(
      `${process.env.MOCKAPI_URL}/lists`,
      body
    );

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};
