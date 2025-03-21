'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumePage() {
    const router = useRouter();
    const resumePath =
        process.env.NEXT_PUBLIC_RESUME_PATH || '/resume/Reese_Chong_resume.pdf';

    useEffect(() => {
        window.location.href = resumePath;
    }, [resumePath]);

    return null; // No need to render anything
}
