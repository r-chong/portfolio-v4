import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import lexploraImg from '@/public/Lexplora.png';
import htnImg from '@/public/HackTheNorth2023.png';
import spottyImg from '@/public/Spotty.png';

// will change these to external links
export const links = [
    {
        name: 'Home',
        href: '/',
        hash: '#home',
    },
    {
        name: 'About',
        href: 'about',
        hash: '#about',
    },
    {
        name: 'Projects',
        href: 'projects',
        hash: '#projects',
    },
    {
        name: 'Experience',
        href: 'experience',
        hash: '#experience',
    },
    {
        name: 'Blog',
        href: 'blog',
        hash: '#blog',
    },
    {
        name: 'Contact',
        href: 'contact',
        hash: '#contact',
    },
] as const;
// as const is a TypeScript feature that adds precision to the type of an array
// you don't need it but it's good practice

export const experiencesData = [
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

export const projectsData = [
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
    },
    {
        title: 'Hawkeye',
        description:
            'Project for Hack The North 2023 that uses the AdHawk MindLink to allow visually impaired people to know what lecturers are writing.',
        tags: ['GPT-4', 'Google Cloud Platform', 'AdHawk MindLink SDK'],
        imageUrl: htnImg,
    },
    {
        title: 'Spotify Clone',
        description:
            "A full stack app using Spotify's Official SDK. It plays music, retrieves lyrics, and censors profanity (togglable). I also added new themes",
        tags: ['React', 'Node JS', 'Spotify API', 'Bootstrap'],
        imageUrl: spottyImg,
    },

    {
        title: 'Coffee Coach',
        description:
            'An emotion analyzer for people in video calls, analyzing facial expressions to aid individuals who struggle with picking up on these cues, as well as reflecting back what expressions they are conveying.',
        tags: [
            'REACT.js',
            'Vite',
            'Tailwind CSS',
            'OpenAI API',
            'OpenCV',
            'Face API',
        ],
        imageUrl: 'coffeeCoachImg',
    },
    {
        title: 'InterviewGPT',
        description:
            'A CLI application that evaluates tech candidates using Large Language Models (LLMs), featuring tracking and analysis reporting capabilities via email.',
        tags: ['Python', 'Langchain', 'OpenAI API', 'Firebase Firestore'],
        imageUrl: 'interviewGPTImg',
    },
    {
        title: 'Computer Science Youth of America Website',
        description:
            'An educational initiative teaching computer science to youth, reaching over 950 students globally. The website was transitioned from Wix to a modern React-Next platform, optimizing page load times.',
        tags: ['REACT.js', 'Next.js', 'TypeScript'],
        imageUrl: 'csyaWebsiteImg',
    },
    {
        title: 'Genius Chat',
        description:
            'A custom solution developed to meet the specific contrast requirements for visually impaired users, resulting in the creation of a specialized web theme for enhanced accessibility.',
        tags: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL'],
        imageUrl: 'geniusChatImg',
    },
] as const;

export const skillsData = [
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
