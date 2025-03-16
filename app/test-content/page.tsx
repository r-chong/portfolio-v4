import { getAllPosts } from '@/lib/mdx';
import type { PostFrontMatter, ProjectFrontMatter } from '@/lib/mdx';

export default async function TestContentPage() {
    // Try to get all posts and projects
    const posts = await getAllPosts<PostFrontMatter>('posts');
    const projects = await getAllPosts<ProjectFrontMatter>('projects');

    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>Content Test Page</h1>

            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-4'>
                    Posts ({posts.length})
                </h2>
                <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto'>
                    {JSON.stringify(
                        posts.map((post) => ({
                            slug: post.slug,
                            title: post.frontMatter.title,
                            date: post.frontMatter.date,
                        })),
                        null,
                        2
                    )}
                </pre>
            </div>

            <div>
                <h2 className='text-xl font-semibold mb-4'>
                    Projects ({projects.length})
                </h2>
                <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto'>
                    {JSON.stringify(
                        projects.map((project) => ({
                            slug: project.slug,
                            title: project.frontMatter.title,
                            date: project.frontMatter.date,
                        })),
                        null,
                        2
                    )}
                </pre>
            </div>
        </div>
    );
}
