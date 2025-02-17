'use client';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { projectsData } from '@/lib/data';
import ProjectDefault from './ProjectDefault';
import { useRouter, useSearchParams } from 'next/navigation';

type ProjectsProps = {
    displayType: 'grid' | 'linear';
    maxIndex: number;
};

function ProjectsContent({ displayType, maxIndex }: ProjectsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(
        searchParams.get('search') || ''
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        searchParams.get('tags')?.split(',').filter(Boolean) || []
    );

    // Get unique tags from all projects and sort by frequency
    const allTags = useMemo(() => {
        const tagFrequency = new Map<string, number>();
        projectsData.forEach((project) => {
            project.tags.forEach((tag) => {
                tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
            });
        });
        return Array.from(tagFrequency.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag);
    }, []);

    const [showAllTags, setShowAllTags] = useState(false);
    const visibleTags = showAllTags ? allTags : allTags.slice(0, 5);

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));

        const newUrl = `${window.location.pathname}${
            params.toString() ? '?' + params.toString() : ''
        }`;
        router.push(newUrl, { scroll: false });
    }, [searchTerm, selectedTags, router]);

    // Handle tag selection
    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // Filter projects based on search term and selected tags
    const filteredProjects = useMemo(() => {
        const filtered = projectsData.filter((project) => {
            // Trim and normalize search term
            const normalizedSearch = searchTerm.trim().toLowerCase();

            // Skip search filtering if search is empty
            if (!normalizedSearch) return true;

            const titleMatch = project.title
                .toLowerCase()
                .includes(normalizedSearch);
            const descriptionMatch = project.description
                .toLowerCase()
                .includes(normalizedSearch);

            const matchesSearch = titleMatch || descriptionMatch;

            const matchesTags =
                selectedTags.length === 0 ||
                (project.tags &&
                    selectedTags.every((tag) => project.tags.includes(tag)));

            return matchesSearch && matchesTags;
        });

        // For debugging
        console.log(
            'All matching projects before slice:',
            filtered.map((p) => p.title)
        );

        // Only apply maxIndex if it's positive and we're not searching/filtering
        return !searchTerm && selectedTags.length === 0 && maxIndex > 0
            ? filtered.slice(0, maxIndex)
            : filtered;
    }, [searchTerm, selectedTags, maxIndex]);

    // For debugging
    useEffect(() => {
        console.log('Current search term:', searchTerm);
        console.log('Selected tags:', selectedTags);
        console.log('Filtered projects:', filteredProjects);
    }, [searchTerm, selectedTags, filteredProjects]);

    return (
        <section className='container mx-auto px-4 space-y-8'>
            <div className='max-w-3xl mx-auto space-y-4'>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search projects by title or description...'
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
                            {tag}
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
            </div>

            <div
                className={`${
                    displayType === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'
                        : 'flex flex-col space-y-8 max-w-3xl mx-auto'
                }`}
            >
                {filteredProjects.map((project, index) => (
                    <ProjectDefault key={index} {...project} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <p className='text-center text-gray-500 dark:text-gray-400'>
                    No projects found matching your search criteria.
                </p>
            )}
        </section>
    );
}

export default function Projects(props: ProjectsProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProjectsContent {...props} />
        </Suspense>
    );
}
