import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - 获取所有论文（公开API）
export async function GET(request: NextRequest) {
  try {
    const papers = await query(
      "SELECT * FROM papers ORDER BY created_at DESC"
    );

    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}
