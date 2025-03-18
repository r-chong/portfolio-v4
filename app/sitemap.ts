import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import type { PostFrontMatter, ProjectFrontMatter } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

    // Get all posts and projects
    const posts = await getAllPosts<PostFrontMatter>('posts');
    const projects = await getAllPosts<ProjectFrontMatter>('projects');

    // Create sitemap entries for static pages
    const staticPages = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    // Create sitemap entries for posts
    const postEntries = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.frontMatter.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Create sitemap entries for projects
    const projectEntries = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project.frontMatter.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Combine all entries
    return [...staticPages, ...postEntries, ...projectEntries];
}
