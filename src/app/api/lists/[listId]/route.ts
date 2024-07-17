import { List } from "@/types/list.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    listId: string;
  };
};

// Get list
export const GET = async (req: NextRequest, { params }: Context) => {
  try {
    const { data } = await axios.get<List>(
      `${process.env.MOCKAPI_URL}/lists/${params.listId}`
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};

// Delete list
export const DELETE = async (req: NextRequest, { params }: Context) => {
  try {
    await axios.delete(`${process.env.MOCKAPI_URL}/lists/${params.listId}`);

    return NextResponse.json(
      { message: "List successfully delete" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};
