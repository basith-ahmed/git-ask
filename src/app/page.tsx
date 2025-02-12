import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {

  return (
    <div>
      Hello
      <Button>Click</Button>
      <SignOutButton />
    </div>
  );
}
