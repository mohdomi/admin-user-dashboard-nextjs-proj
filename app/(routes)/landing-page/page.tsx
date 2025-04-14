'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
// Assuming Button is imported from shadcn/ui or a similar library
// If not, replace with a standard button or import appropriately
import { Button } from "@/components/ui/button";
// Updated icon imports
import { UserPlus, LogIn, Heart } from 'lucide-react';

const Landing = () => {

    const router = useRouter();

    return (
        // Changed background from gradient to plain light gray
        <div className="min-h-screen p-4 sm:p-8">
            <header className="w-full flex justify-center py-4">
                {/* Adjusted header text color for light background */}
                <h1 className="text-3xl sm:text-6xl font-bold text-gray-800 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-600 to-blue-200">
                        Friend Book
                    </span>
                </h1>
            </header>
            <main className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8 mt-8 md:mt-16">
                <div className="text-center md:text-left space-y-4 sm:space-y-6">
                    <h1
                        // Adjusted main heading text color/gradient for light background
                        className="p-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-600 to-blue-200"
                    >
                        Connect.
                        <br />
                        Remember.
                        <br />
                        Belong.
                    </h1>
                    <p
                        // Adjusted paragraph text color for light background
                        className="font-semibold text-lg sm:text-xl text-gray-700 min-w-xl max-w-2xl"
                    >
                        Your digital college yearbook. Reconnect with classmates,
                        cherish memories, and build a network that lasts a lifetime.
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        {/* Changed button to "Sign Up" */}
                        <Button
                            variant="default"
                            size="lg"
                            className="bg-gradient-to-r from-neutral-600 to-blue-200 text-white
                                       hover:from-neutral-600 hover:to-neutral-500 px-6 sm:px-8 py-3 sm:py-4
                                       rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                                       flex items-center gap-2"
                            onClick={()=>{
                                router.push('/signup');
                            }}
                        >
                            <UserPlus className="w-5 h-5" /> {/* Changed icon */}
                            Sign Up
                        </Button>
                        {/* Changed button to "Sign In" */}
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-slate-600 border-neutral-600 hover:bg-blue-200
                                       px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors duration-200
                                       flex items-center gap-2"
                            
                                       onClick={()=>{
                                        router.push("/signin")
                                       }}
                        >
                            <LogIn className="w-5 h-5" /> {/* Changed icon */}
                            Sign In
                        </Button>
                    </div>
                </div>

            </main>
             <footer className="w-full py-6 text-center text-gray-500 mt-12 md:mt-24"> {/* Adjusted margin top */}
                <div className="flex items-center justify-center gap-2 text-sm">
                    <Heart className="w-4 h-4" />
                    <span>
                        Made by Omair, Oves, Husain
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
