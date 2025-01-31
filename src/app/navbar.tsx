// navbar.tsx
"use client"; // Ajoutez cette ligne en haut du fichier

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import './globals.css';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MyApp
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <div className="hidden sm:flex space-x-4">
                  <SignInButton>
                    <button className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Connexion
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Inscription
                    </button>
                  </SignUpButton>
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonBox: "border-2 border-cyan-400 rounded-full",
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;