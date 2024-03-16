'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function SectionDivider() {
    return (
        <div className='flex justify-center'>
            <motion.div
                className='hidden w-1 h-16 my-24 bg-gray-200 rounded-full sm:block'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: 'spring',
                    delay: 0.1,
                    stiffness: 125,
                    duration: 0.7,
                }}
            ></motion.div>
        </div>
    );
}
