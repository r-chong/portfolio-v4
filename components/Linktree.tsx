import React, { useState } from 'react';
import LinkButton from './LinkButton';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { HiDownload } from 'react-icons/hi';

export default function Linktree() {
    const [isCopied, setIsCopied] = useState(false);

    const copyEmailAddress = () => {
        navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`
        );

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        // toast('Copied Email Address! ✅', {
        //     backgroundColor: '#41a047',
        //     color: '#ffffff',
        // });
    };

    return (
        <div className='flex flex-col gap-2'>
            <LinkButton onClick={copyEmailAddress}>
                {isCopied ? (
                    <span>Copied Email Address! ✅</span>
                ) : (
                    <>
                        <span>Copy email address</span>
                        <MdOutlineMail className='text-xl' />
                    </>
                )}
            </LinkButton>

            <LinkButton href='/resume'>
                <span>Resume</span>
                <HiDownload className='text-xl' />
            </LinkButton>

            <LinkButton href='https://linkedin.com/in/reesechong/'>
                <span>LinkedIn</span>
                <BsLinkedin className='text-xl' />
            </LinkButton>

            <LinkButton href='https://github.com/r-chong/'>
                <span>GitHub</span>
                <BsGithub className='text-xl' />
            </LinkButton>
        </div>
    );
}
