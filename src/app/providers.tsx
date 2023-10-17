"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                {children}
            </ThemeProvider>
        </AuthContextProvider>
    );
}

export default Providers;