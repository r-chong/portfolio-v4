import fs from 'fs';
import path from 'path';

export default function TestPathsPage() {
    const ROOT_PATH = process.cwd();
    const POSTS_PATH = path.join(ROOT_PATH, 'content/posts');
    const PROJECTS_PATH = path.join(ROOT_PATH, 'content/projects');

    // Check if directories exist
    const postsExists = fs.existsSync(POSTS_PATH);
    const projectsExists = fs.existsSync(PROJECTS_PATH);

    // List files in directories if they exist
    let postFiles: string[] = [];
    let projectFiles: string[] = [];

    if (postsExists) {
        try {
            postFiles = fs.readdirSync(POSTS_PATH);
        } catch (error) {
            console.error('Error reading posts directory:', error);
        }
    }

    if (projectsExists) {
        try {
            projectFiles = fs.readdirSync(PROJECTS_PATH);
        } catch (error) {
            console.error('Error reading projects directory:', error);
        }
    }

    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>File Path Test</h1>

            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Root Path</h2>
                <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded'>
                    {ROOT_PATH}
                </pre>
            </div>

            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Posts Path</h2>
                <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded'>
                    {POSTS_PATH}
                </pre>
                <p className='mt-2'>
                    Directory exists: {postsExists ? 'Yes' : 'No'}
                </p>

                {postsExists && (
                    <div className='mt-4'>
                        <h3 className='text-lg font-medium mb-2'>
                            Files ({postFiles.length})
                        </h3>
                        <ul className='list-disc pl-5'>
                            {postFiles.map((file) => (
                                <li key={file}>{file}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Projects Path</h2>
                <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded'>
                    {PROJECTS_PATH}
                </pre>
                <p className='mt-2'>
                    Directory exists: {projectsExists ? 'Yes' : 'No'}
                </p>

                {projectsExists && (
                    <div className='mt-4'>
                        <h3 className='text-lg font-medium mb-2'>
                            Files ({projectFiles.length})
                        </h3>
                        <ul className='list-disc pl-5'>
                            {projectFiles.map((file) => (
                                <li key={file}>{file}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
