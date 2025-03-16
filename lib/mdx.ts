import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';

// Base frontmatter type
export type BaseFrontMatter = {
    title: string;
    date: string; // ISO date string format
    description?: string;
    tags?: string[];
    imageUrl?: string;
};

// Post-specific frontmatter
export type PostFrontMatter = BaseFrontMatter & {
    type?: 'Post';
};

// Project-specific frontmatter
export type ProjectFrontMatter = BaseFrontMatter & {
    type?: 'Project';
    projectLink?: string;
    images?: string[];
    stack?: string[];
    status?: 'completed' | 'in-progress' | 'archived';
};

// Combined type for all frontmatter
export type FrontMatter = PostFrontMatter | ProjectFrontMatter;

// MDX content type
export type MDXContent<T extends FrontMatter = FrontMatter> = {
    slug: string;
    frontMatter: T;
    content: string;
    readingTime: string;
};

// Type aliases for specific content types
export type MDXPost = MDXContent<PostFrontMatter>;
export type MDXProject = MDXContent<ProjectFrontMatter>;

const ROOT_PATH = process.cwd();
const POSTS_PATH = path.join(ROOT_PATH, 'content/posts');
const PROJECTS_PATH = path.join(ROOT_PATH, 'content/projects');

export const getFiles = (type: 'posts' | 'projects') => {
    const dirPath = type === 'posts' ? POSTS_PATH : PROJECTS_PATH;
    return fs.readdirSync(dirPath).filter((file) => {
        const isDirectory = fs
            .lstatSync(path.join(dirPath, file))
            .isDirectory();
        return !isDirectory && /\.mdx?$/.test(file);
    });
};

export const getPostBySlug = async <T extends FrontMatter>(
    slug: string,
    type: 'posts' | 'projects'
): Promise<MDXContent<T>> => {
    const dirPath = type === 'posts' ? POSTS_PATH : PROJECTS_PATH;
    const filePath = path.join(dirPath, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');

    const { data, content } = matter(source);

    // Ensure date is in ISO format
    const date = data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString();

    const mdxSource = await serialize(content, {
        parseFrontmatter: true,
        mdxOptions: {
            development: process.env.NODE_ENV === 'development',
        },
    });

    return {
        slug,
        frontMatter: {
            ...data,
            date,
            type: type === 'posts' ? 'Post' : 'Project',
        } as T,
        content: mdxSource as any,
        readingTime: readingTime(content).text,
    };
};

export const getAllPosts = async <T extends FrontMatter>(
    type: 'posts' | 'projects'
): Promise<MDXContent<T>[]> => {
    const files = getFiles(type);

    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx?$/, '');
            const post = await getPostBySlug<T>(slug, type);
            return post;
        })
    );

    return posts.sort((a, b) => {
        if (a.frontMatter.date < b.frontMatter.date) return 1;
        if (a.frontMatter.date > b.frontMatter.date) return -1;
        return 0;
    });
};
