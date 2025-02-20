import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { AppSidebar } from "./AppSidebar";

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
            <div className="ml-auto"></div>
            <UserButton />
          </div>
          {/* <div className="h-4"></div> */}
          <div className="bg-sidebar overflow-y-scroll h-[calc(100vh-4.9rem)] p-2">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default SidebarLayout;
