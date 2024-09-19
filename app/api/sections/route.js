// app/api/sections/route.js
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Helper to get the path of the JSON file
const getFilePath = () => path.join(process.cwd(), "data", "sections.json");

// Helper to read JSON file
const readJSONFile = async () => {
  const filePath = getFilePath();
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

// Helper to write to the JSON file
const writeJSONFile = async (data) => {
  const filePath = getFilePath();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// GET: Fetch all sections
export async function GET() {
  try {
    const sections = await readJSONFile();
    return NextResponse.json({ sections }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error reading sections" },
      { status: 500 }
    );
  }
}

// POST: Add a new section
export async function POST(req) {
  try {
    const sections = await readJSONFile();
    const newSection = await req.json();
    newSection.id = Date.now(); // Generate a unique ID
    sections.push(newSection);

    await writeJSONFile(sections);

    return NextResponse.json(newSection, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding section" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing section
export async function PUT(req) {
  try {
    const sections = await readJSONFile();
    const { id, updatedSection } = await req.json();

    const sectionIndex = sections.findIndex((s) => s.id === id);
    if (sectionIndex === -1) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    sections[sectionIndex] = { ...sections[sectionIndex], ...updatedSection };

    await writeJSONFile(sections);

    return NextResponse.json(sections[sectionIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating section" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a section by ID
export async function DELETE(req) {
  try {
    const sections = await readJSONFile();
    const { id } = await req.json();

    const filteredSections = sections.filter((s) => s.id !== id);

    if (sections.length === filteredSections.length) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    await writeJSONFile(filteredSections);

    return NextResponse.json({ message: "Section deleted" }, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting section" },
      { status: 500 }
    );
  }
}
