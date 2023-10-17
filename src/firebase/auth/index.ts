import firebase_app from "../config";
import { signInWithPopup, getAuth, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

const provider = new GoogleAuthProvider();

// Function to sign in with email and password
export async function signIn() {
    let result = null, // Variable to store the sign-in result
        error = null; // Variable to store any error that occurs

    try {
        result = await signInWithPopup(auth, provider); // Sign in with email and password
    } catch (e) {
        error = e; // Catch and store any error that occurs during sign-in
    }

    return { result, error }; // Return the sign-in result and error (if any)
}

export async function signOut() {
    return await firebaseSignOut(auth);
}