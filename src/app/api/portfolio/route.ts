import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio.json");

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Simple password protection (in a real app, use better auth)
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== "Bearer admin123") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.data) {
       return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body.data, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
