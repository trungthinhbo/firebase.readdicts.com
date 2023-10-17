'use client'
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { signIn } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Page(): JSX.Element {
    // Access the user object from the authentication context
    // const { user } = useAuthContext();
    const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
    const router = useRouter();

    useEffect(() => {
        // Redirect to the home page if the user is not logged in
        if (user) {
            router.push("/");
        }
        // }, [ user ] );
    }, [user, router]); // Include 'router' in the dependency array to resolve eslint warning

    // Handle form submission
    const signInWithGoogle = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // Attempt to sign in with provided email and password
        const { result, error } = await signIn();

        if (error) {
            // Display and log any sign-in errors
            console.log(error);
            return;
        }

        // Sign in successful
        console.log(result);

        // Redirect to the admin page
        // Typically you would want to redirect them to a protected page an add a check to see if they are admin or 
        // create a new page for admin
        router.push("/");
    }

    return (
        <Button variant="outline" onClick={signInWithGoogle}>Login with google</Button>
    );
}

export default Page;