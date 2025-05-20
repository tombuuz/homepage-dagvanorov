import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function getAllProjects() {
	return await getCollection("project");
}

export function getUniqueTags(projects: CollectionEntry<"project">[]) {
	const tags = new Set<string>();
	projects.forEach((project) => {
		project.data.technologies?.forEach((tech) => tags.add(tech));
	});
	return Array.from(tags);
}

export function groupProjectsByYear(projects: CollectionEntry<"project">[]) {
	return projects.reduce((acc, project) => {
		const year = new Date().getFullYear(); // Since projects don't have publishDate, use current year
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(project);
		return acc;
	}, {} as Record<number, CollectionEntry<"project">[]>);
} 