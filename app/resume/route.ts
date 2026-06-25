import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume PDF from public folder
    const filePath = join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = readFileSync(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=Adnan_Resume.pdf",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Resume fetch error:", error);
    return new Response("Resume not found", { status: 404 });
  }
}
