import React from 'react';

interface VideoPitchProps {
    videoId: string;
}

const VideoPitch = ({ videoId }: VideoPitchProps): JSX.Element => {
    return (
        <main className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4'>
            <div className='w-full max-w-4xl'>
                <div
                    className='relative w-full rounded-lg overflow-hidden'
                    style={{ paddingTop: '56.25%' }}
                >
                    <iframe
                        className='absolute top-0 left-0 w-full h-full'
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title='Reese Chong - 4 minute and 32 second SWE pitch'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                </div>
            </div>
        </main>
    );
};

export default VideoPitch;
