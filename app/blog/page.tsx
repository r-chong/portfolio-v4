import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'A series of blog posts.',
};

// Make the component async and add error handling
export default async function BlogPage() {
    try {
        // Ensure we have posts before sorting
        if (!Array.isArray(allPosts)) {
            throw new Error('Posts data is not available');
        }

        const sortedPosts = [...allPosts].sort((a, b) =>
            compareDesc(new Date(a.date), new Date(b.date))
        );

        // Get unique tags from all posts
        const allTags = Array.from(
            new Set(
                sortedPosts
                    .filter((post) => post.tags)
                    .flatMap((post) => post.tags || [])
            )
        ).sort();

        return <BlogClient initialPosts={sortedPosts} allTags={allTags} />;
    } catch (error) {
        console.error('Error in blog page:', error);
        // Return a fallback UI
        return (
            <div className='mx-auto max-w-4xl px-6 py-12'>
                <h1 className='text-3xl font-bold text-center'>Blog</h1>
                <p className='text-center text-gray-600 mt-4'>
                    Unable to load blog posts at this time. Please try again
                    later.
                </p>
            </div>
        );
    }
}
