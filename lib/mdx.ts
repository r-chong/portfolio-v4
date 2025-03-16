import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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
    try {
        const dirPath = type === 'posts' ? POSTS_PATH : PROJECTS_PATH;
        console.log(`Looking for files in: ${dirPath}`);

        const files = fs.readdirSync(dirPath).filter((file) => {
            const isDirectory = fs
                .lstatSync(path.join(dirPath, file))
                .isDirectory();
            return !isDirectory && /\.mdx?$/.test(file);
        });

        console.log(`Found ${files.length} files in ${dirPath}`);
        return files;
    } catch (error) {
        console.error(`Error getting files from ${type}:`, error);
        return [];
    }
};

export const getPostBySlug = async <T extends FrontMatter>(
    slug: string,
    type: 'posts' | 'projects'
): Promise<MDXContent<T>> => {
    try {
        const dirPath = type === 'posts' ? POSTS_PATH : PROJECTS_PATH;
        const filePath = path.join(dirPath, `${slug}.mdx`);
        console.log(`Reading file: ${filePath}`);

        const source = fs.readFileSync(filePath, 'utf8');

        const { data, content } = matter(source);

        // Ensure date is in ISO format
        const date = data.date
            ? new Date(data.date).toISOString()
            : new Date().toISOString();

        // Return the raw content instead of serializing it
        console.log(
            `Processed MDX for ${slug}, content length:`,
            content.length
        );

        return {
            slug,
            frontMatter: {
                ...data,
                date,
                type: type === 'posts' ? 'Post' : 'Project',
            } as T,
            content: content,
            readingTime: readingTime(content).text,
        };
    } catch (error) {
        console.error(
            `Error getting post by slug ${slug} from ${type}:`,
            error
        );
        throw error;
    }
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
