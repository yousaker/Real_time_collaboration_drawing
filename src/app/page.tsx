import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
      <div>
        <h1>Welcome to Next.js!</h1>
        <SignInButton />
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }
  