'use server';
import bcrypt from 'bcrypt';
import { signIn } from 'next-auth/react'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log({ hashPassword });

        await signIn('credentials', {
            redirect: false,
            email,
            password,
        });


    } catch (error) {
        console.error(error);
        return 'Something went wrong.';

    }
}