'use client';

// memoization in real life??
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import { CompactModeProvider, useCompactMode } from '@/lib/CompactModeContext';
import { compareDesc } from 'date-fns';
import type { PostFrontMatter } from '@/lib/mdx';

// Helper function to get URL parameters
function getUrlParams() {
    if (typeof window === 'undefined') return { search: '', tags: [] };

    const params = new URLSearchParams(window.location.search);
    return {
        search: params.get('search') || '',
        tags: params.get('tags')?.split(',').filter(Boolean) || [],
    };
}

function CompactModeToggle() {
    const { isCompact, toggleCompactMode } = useCompactMode();

    return (
        <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
                Compact
            </span>
            <button
                onClick={toggleCompactMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    isCompact
                        ? 'bg-green-500 dark:bg-green-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                }`}
                role='switch'
                aria-checked={isCompact}
            >
                <span
                    className={`${
                        isCompact ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                />
            </button>
        </div>
    );
}

interface BlogPost extends PostFrontMatter {
    slug: string;
    readingTime: string;
}

interface BlogClientProps {
    initialPosts: BlogPost[];
    allTags: string[];
}

function BlogContent({ initialPosts = [], allTags = [] }: BlogClientProps) {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Initialize state from URL on mount
    useEffect(() => {
        const { search, tags } = getUrlParams();
        setSearchTerm(search);
        setSelectedTags(tags);
    }, []);

    const [showAllTags, setShowAllTags] = useState(false);
    const visibleTags = showAllTags ? allTags : allTags.slice(0, 5);

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));

        // reesechong.com/blog?search=test&tags=test1,test2
        const newUrl = `${window.location.pathname}${
            params.toString() ? '?' + params.toString() : ''
        }`;

        // Use history.pushState for client-side URL updates
        window.history.pushState({}, '', newUrl);
    }, [searchTerm, selectedTags]);

    // Handle tag selection
    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // Filter posts
    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            if (!post) return false;

            // Handle search term
            const normalizedSearch = searchTerm.trim().toLowerCase();
            if (normalizedSearch) {
                const titleMatch =
                    post.title?.toLowerCase().includes(normalizedSearch) ??
                    false;
                const descriptionMatch =
                    post.description
                        ?.toLowerCase()
                        .includes(normalizedSearch) ?? false;
                const tagsMatch =
                    post.tags?.some((tag) =>
                        tag.toLowerCase().includes(normalizedSearch)
                    ) ?? false;

                if (!(titleMatch || descriptionMatch || tagsMatch)) {
                    return false;
                }
            }

            // Handle tag filtering
            if (selectedTags.length > 0) {
                if (
                    !post.tags ||
                    !selectedTags.every((tag) => post.tags?.includes(tag))
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [searchTerm, selectedTags, initialPosts]);

    return (
        <div className='mx-auto max-w-4xl px-6 py-12'>
            <div className='space-y-8'>
                <div className='space-y-4'>
                    <h1 className='text-3xl font-bold text-center dark:text-gray-100'>
                        Blog
                    </h1>
                    <p className='text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto'>
                        Some thoughts of mine.
                    </p>
                    <div className='flex justify-center'>
                        <CompactModeToggle />
                    </div>
                </div>

                <div className='max-w-3xl mx-auto space-y-4'>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Search posts by title, description, or tags...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {allTags.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                            {visibleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        selectedTags.includes(tag)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    } hover:opacity-80 transition-opacity`}
                                >
                                    #{tag}
                                    {selectedTags.includes(tag) && ' ×'}
                                </button>
                            ))}
                            {allTags.length > 5 && (
                                <button
                                    onClick={() => setShowAllTags(!showAllTags)}
                                    className='px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:opacity-80 transition-opacity'
                                >
                                    {showAllTags
                                        ? 'Show Less'
                                        : `+${allTags.length - 5} More`}
                                </button>
                            )}
                            {selectedTags.length > 0 && (
                                <button
                                    onClick={() => setSelectedTags([])}
                                    className='px-3 py-1 rounded-full text-sm bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:opacity-80 transition-opacity'
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className='space-y-4'>
                    {filteredPosts.map((post, idx) => (
                        <PostCard
                            key={idx}
                            post={post}
                            onTagClick={(tag) => toggleTag(tag)}
                        />
                    ))}
                    {filteredPosts.length === 0 && (
                        <p className='text-center text-gray-500 dark:text-gray-400'>
                            No posts found matching your search criteria.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function BlogClient({ initialPosts, allTags }: BlogClientProps) {
    return (
        <CompactModeProvider>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <BlogContent initialPosts={initialPosts} allTags={allTags} />
            </motion.div>
        </CompactModeProvider>
    );
}
