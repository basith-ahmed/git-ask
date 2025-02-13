import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <div>Landing Page</div>
      <div className="w-20 bg-red-500 p-2">
        <SignOutButton />
      </div>
      <Link href="/dashboard" className="bg-green-200 p-2">
        /dashboard
      </Link>
      <Link href="/sign-up" className="bg-green-200 p-2">
        /sign-up
      </Link>
      <Link href="/sign-in" className="bg-green-200 p-2">
        /sign-in
      </Link>
    </div>
  );
}
