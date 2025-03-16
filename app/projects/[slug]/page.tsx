// app/projects/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { getPostBySlug } from '@/lib/mdx';
import type { MDXProject } from '@/lib/mdx';

interface ProjectPageProps {
    params: {
        slug: string;
    };
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
        const project = await getPostBySlug<MDXProject['frontMatter']>(
            params.slug,
            'projects'
        );

        return (
            <article className='prose dark:prose-invert max-w-none'>
                <div className='mb-8'>
                    <h1>{project.frontMatter.title}</h1>
                    {project.frontMatter.imageUrl && (
                        <div className='relative w-full h-[24rem] mb-8 overflow-hidden rounded-xl'>
                            <Image
                                src={project.frontMatter.imageUrl}
                                alt={project.frontMatter.title}
                                fill
                                className='object-cover'
                                priority
                            />
                        </div>
                    )}
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
                <MDXRemote {...project.content} />
            </article>
        );
    } catch (error) {
        notFound();
    }
}
