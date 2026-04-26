import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch from GitHub");
    }

    const repos = await response.json();
    
    // Map to our project structure
    const projects = repos
      .filter((repo: any) => !repo.fork) // Ignore forks
      .map((repo: any, index: number) => ({
        id: `github-${repo.id}`,
        title: repo.name.replace(/-/g, " "),
        description: repo.description || "Aucune description fournie sur GitHub.",
        role: "Développeur",
        technologies: repo.language ? [repo.language] : ["N/A"],
        type: "Projet GitHub",
        date: new Date(repo.created_at).getFullYear().toString(),
        results: [
          `⭐ ${repo.stargazers_count} étoiles`,
          `🍴 ${repo.forks_count} forks`
        ],
        github: repo.html_url,
        demo: repo.homepage || "#",
        image: "/projects/github-placeholder.jpg" // We'll need a generic image for GitHub repos
      }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub repositories" }, { status: 500 });
  }
}
