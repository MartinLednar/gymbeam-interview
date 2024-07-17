import { Todo } from "@/types/todo.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Create todo
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { data } = await axios.post<Todo>(
      `${process.env.MOCKAPI_URL}/lists/${body.listId}/todos`,
      body
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};

// Update todo
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { data } = await axios.put<Todo>(
      `${process.env.MOCKAPI_URL}/lists/${body.listId}/todos/${body.id}`,
      body
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};

// Delete todo
export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { data } = await axios.delete<Todo>(
      `${process.env.MOCKAPI_URL}/lists/${body.listId}/todos/${body.todoId}`
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};
