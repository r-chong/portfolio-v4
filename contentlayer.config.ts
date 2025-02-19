// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/**/*.mdx`,
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        description: { type: 'string', required: true },
        imageUrl: { type: 'string', required: true },
        tags: {
            type: 'list',
            of: { type: 'string' },
            required: false,
            default: [],
        },
    },
    contentType: 'mdx',
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) => `/posts/${post._raw.flattenedPath}`,
        },
    },
}));

export const ProjectWriteup = defineDocumentType(() => ({
    name: 'ProjectWriteup',
    filePathPattern: `projects/**/*.mdx`,
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        imageUrl: { type: 'string', required: false }, // Keep for backward compatibility
        images: {
            type: 'list',
            of: { type: 'string' },
            required: false, // Changed to false for backward compatibility
        },
        projectLink: { type: 'string', required: false },
        tags: {
            type: 'list',
            of: { type: 'string' },
            required: false,
        },
    },
    contentType: 'mdx',
    computedFields: {
        url: {
            type: 'string',
            resolve: (projectWriteup) =>
                `/projects/${projectWriteup._raw.flattenedPath}`,
        },
        // Add a computed field to handle both single and multiple images
        processedImages: {
            type: 'list',
            of: { type: 'string' },
            resolve: (doc) => {
                if (doc.images && doc.images.length > 0) {
                    return doc.images;
                }
                // If no images array but has imageUrl, use that
                if (doc.imageUrl) {
                    return [doc.imageUrl];
                }
                return [];
            },
        },
    },
}));

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post, ProjectWriteup],
});
