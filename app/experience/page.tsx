'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function experienceRedirect(id: string) {
    redirect(`/resume`);

    return (
        <div>
            That&apos;s weird, you should have been redirected to my resume
        </div>
    );
}
