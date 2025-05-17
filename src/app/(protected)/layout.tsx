import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { AppSidebar } from "./AppSidebar";
import { Info } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="flex items-center gap-2 border-b border-sidebar-border bg-sidebar p-2 px-4">
            {/* <SearchBar /> */}
            <div className="text-sm flex items-center gap-2 text-gray-500">
              <Info /> The services have been temporarily disabled by the admin.
              Contact{" "}
              <Link href="https://github.com/basith-ahmed" className=" underline">@basith-ahmed </Link>
              for more info.
            </div>
            <div className="ml-auto"></div>
            <UserButton />
          </div>
          {/* <div className="h-4"></div> */}
          <div className="h-[calc(100vh-2.8rem)] overflow-y-scroll bg-sidebar p-2">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default SidebarLayout;
