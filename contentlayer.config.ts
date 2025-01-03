// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        imageUrl: { type: 'string', required: true },
    },
    contentType: 'mdx',
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) => `/posts/${post._raw.flattenedPath}`,
        },
    },
}));

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] });
