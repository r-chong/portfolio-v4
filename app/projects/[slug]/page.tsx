// app/projects/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import type { MDXProject, ProjectFrontMatter } from '@/lib/mdx';
import { ProjectCarousel } from './ProjectCarousel';
import components from '@/components/mdx-components';
import { mdxOptions } from '@/lib/mdx-utils';

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const projects = await getAllPosts<ProjectFrontMatter>('projects');
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    try {
        const project = await getPostBySlug<MDXProject['frontMatter']>(
            params.slug,
            'projects'
        );

        return {
            title: project.frontMatter.title,
            description: project.frontMatter.description,
            openGraph: {
                title: project.frontMatter.title,
                description: project.frontMatter.description,
                type: 'article',
                publishedTime: project.frontMatter.date,
                images: project.frontMatter.imageUrl
                    ? [project.frontMatter.imageUrl]
                    : [],
            },
            twitter: {
                card: 'summary_large_image',
                title: project.frontMatter.title,
                description: project.frontMatter.description,
                images: project.frontMatter.imageUrl
                    ? [project.frontMatter.imageUrl]
                    : [],
            },
        };
    } catch (error) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        };
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    try {
        console.log(`Attempting to fetch project with slug: ${params.slug}`);
        const project = await getPostBySlug<MDXProject['frontMatter']>(
            params.slug,
            'projects'
        );
        console.log(
            `Successfully fetched project: ${project.frontMatter.title}`
        );
        console.log('Content length:', project.content.length);

        return (
            <article className='prose dark:prose-invert max-w-none'>
                <div className='mb-8'>
                    <h1>{project.frontMatter.title}</h1>

                    {/* Use ProjectCarousel instead of single image */}
                    <ProjectCarousel post={project.frontMatter} />

                    <div className='flex flex-wrap gap-4 mb-4'>
                        {project.frontMatter.stack?.map((tech) => (
                            <span
                                key={tech}
                                className='px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full'
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    {project.frontMatter.projectLink && (
                        <a
                            href={project.frontMatter.projectLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4'
                        >
                            View Project →
                        </a>
                    )}
                </div>
                {/* Render MDX content */}
                <div className='mdx-content'>
                    <MDXRemote
                        source={project.content}
                        components={components}
                        options={mdxOptions}
                    />
                </div>
            </article>
        );
    } catch (error) {
        console.error(
            `Error rendering project page for slug ${params.slug}:`,
            error
        );
        notFound();
    }
}
