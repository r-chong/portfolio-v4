import { Metadata } from 'next';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import type { MDXProject } from '@/lib/mdx';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of projects and technical work.',
};

export default async function ProjectsPage() {
    const projects = await getAllPosts<MDXProject['frontMatter']>('projects');

    return (
        <div className='max-w-6xl mx-auto py-12 px-4 sm:px-6'>
            <h1 className='text-3xl font-bold mb-8'>Projects</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}` as LinkProps['href']}
                        className='group'
                    >
                        <article className='flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors'>
                            {project.frontMatter.imageUrl && (
                                <div className='relative w-full h-48'>
                                    <Image
                                        src={project.frontMatter.imageUrl}
                                        alt={project.frontMatter.title}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            )}
                            <div className='flex-1 p-6'>
                                <h2 className='text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                                    {project.frontMatter.title}
                                </h2>
                                {project.frontMatter.description && (
                                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                                        {project.frontMatter.description}
                                    </p>
                                )}
                                <div className='flex flex-wrap gap-2 mt-auto'>
                                    {project.frontMatter.stack
                                        ?.slice(0, 3)
                                        .map((tech) => (
                                            <span
                                                key={tech}
                                                className='px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    {project.frontMatter.stack &&
                                        project.frontMatter.stack.length >
                                            3 && (
                                            <span className='px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full'>
                                                +
                                                {project.frontMatter.stack
                                                    .length - 3}{' '}
                                                more
                                            </span>
                                        )}
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
