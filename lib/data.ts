import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import lexploraImg from '@/public/projects/Lexplora.png';
import htnImg from '@/public/projects/HackTheNorth2023.png';
import spottyImg from '@/public/projects/Spotty.png';
import interviewGPTImg from '@/public/projects/InterviewGPT.png';
import coffeeCoachImg from '@/public/projects/CoffeeCoach.png';
import geniusChatImg from '@/public/projects/Accessible_Chat2.png';
import csyaWebsiteImg from '@/public/projects/CSYAWebsite.png';
import chatgpmeImg from '@/public/projects/ChatGPME.png';

// will change these to external links
type LinkType = {
    name: string;
    url: string;
    hash: string;
};

export const links: LinkType[] = [
    {
        name: 'Home',
        url: '/',
        hash: '#home',
    },
    // {
    //     name: 'About',
    //     url: '/about',
    //     hash: '#about',
    // },
    {
        name: 'Projects',
        url: '/projects',
        hash: '#projects',
    },
    {
        name: 'Now',
        url: '/now',
        hash: '#now',
    },
    // {
    //     name: 'Resume',
    //     url: '/resume',
    //     hash: '#resume',
    // },
    {
        name: 'Blog',
        url: '/blog',
        hash: '#blog',
    },
    // {
    //     name: 'Contact',
    //     url: '/contact',
    //     hash: '#contact',
    // },
] as const;
// as const is a TypeScript feature that adds precision to the type of an array
// you don't need it but it's good practice

type ExperienceType = {
    title: string;
    location: string;
    description: string;
    icon: React.ReactElement;
    date: string;
};

type ExperiencesDataType = ExperienceType[];

export const experiencesData: ExperiencesDataType = [
    {
        title: 'Graduated bootcamp',
        location: 'Miami, FL',
        description:
            'I graduated after 6 months of studying. I immediately found a job as a front-end developer.',
        icon: React.createElement(LuGraduationCap),
        date: '2019',
    },
    {
        title: 'Front-End Developer',
        location: 'Orlando, FL',
        description:
            'I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.',
        icon: React.createElement(CgWorkAlt),
        date: '2019 - 2021',
    },
    {
        title: 'Full-Stack Developer',
        location: 'Houston, TX',
        description:
            "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
        icon: React.createElement(FaReact),
        date: '2021 - present',
    },
] as const;

interface TagProps {
    tag: string;
    index: number;
}

type projectData = [
    title: string,
    description: string,
    tags: string[],
    imageUrl: string,
    blogLink: string
];

export const projectsData = [
    {
        title: 'ChatGPMe',
        description:
            'A playful game where YOU are the AI, and you have to respond to prompts while sounding like AI as much as possible.',
        tags: ['Unity', 'Cohere AI', 'Google Cloud Platform', 'C#'],
        imageUrl: chatgpmeImg,
        blogLink: '/projects/chatgpme',
    },
    {
        title: 'Lexplora',
        description:
            "Lexplora is a 'duolingo for anything' app that helps you learn any subject by providing a prompt. I was the front-end developer in charge of creating the UI and lesson components.",
        tags: [
            'React',
            'Next.js',
            'TypeScript',
            'Tailwind',
            'Langchain',
            'Neo4j',
        ],
        imageUrl: lexploraImg,
        blogLink: '/projects/lexplora',
    },
    {
        title: 'Hawkeye',
        description:
            'Project for Hack The North 2023 that uses the AdHawk MindLink to allow visually impaired people to know what lecturers are writing.',
        tags: ['GPT-4', 'Google Cloud Platform', 'AdHawk MindLink SDK'],
        imageUrl: htnImg,
        blogLink: '/projects/hawkeye',
    },
    {
        title: 'Computer Science Youth of America Website',
        description:
            'CSYA teaches computer science to 950+ youth around the world! I transitioned their website from Wix to a modern React-Next platform, optimizing page load.',
        tags: ['REACT.js', 'Next.js', 'TypeScript'],
        imageUrl: csyaWebsiteImg,
        blogLink: '/projects/csya',
    },
    {
        title: 'Coffee Coach',
        description:
            'Full-stack app that analyzes facial expressions in video calls to aid individuals who struggle with picking up on nonverbal cues.',
        tags: [
            'REACT.js',
            'Vite',
            'Tailwind CSS',
            'OpenAI API',
            'OpenCV',
            'Face API',
        ],
        imageUrl: coffeeCoachImg,
        blogLink: '/projects/coffee-coach',
    },
    {
        title: 'InterviewGPT',
        description:
            'A CLI application that asynchronously evaluates tech candidates using AI, featuring tracking and analysis reporting capabilities via email.',
        tags: ['Python', 'Langchain', 'OpenAI API', 'Firebase Firestore'],
        imageUrl: interviewGPTImg,
        blogLink: '/projects/interviewgpt',
    },
    {
        title: 'Genius Chat',
        description:
            'A custom chat website that I made in grade 8 to talk to my friend who is colour-sensitive. Pictured are the various modes of the website (not stripes)',
        tags: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL'],
        imageUrl: geniusChatImg,
        blogLink: '/projects/accessible-chat',
    },
    {
        title: 'Spotify Clone',
        description:
            "A full stack app using Spotify's Official SDK. It plays music, retrieves lyrics, and censors profanity (togglable). I also added new themes",
        tags: ['React', 'Node JS', 'Spotify API', 'Bootstrap'],
        imageUrl: spottyImg,
        blogLink: '/projects/spotty',
    },
] as const;

type SkillsDataType = string[];

export const skillsData: SkillsDataType = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Git',
    'Tailwind',
    'Prisma',
    'MongoDB',
    'Redux',
    'GraphQL',
    'Apollo',
    'Express',
    'PostgreSQL',
    'Python',
    'Django',
    'Framer Motion',
] as const;
