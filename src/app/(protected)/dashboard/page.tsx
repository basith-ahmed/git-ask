"use client";
import useProject from "@/hooks/use-project";
import { useUser } from "@clerk/nextjs";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import ArchiveButton from "./archive-button";
import TeamMembers from "./team-members";
import dynamic from "next/dynamic";

const InviteButton = dynamic(() => import("./invite-button"), {ssr: false})

type Props = {};

const Dashboard = (props: Props) => {
  const { user } = useUser();

  const { project } = useProject();

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is connected to
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <TeamMembers />
          <InviteButton />
          <ArchiveButton />
        </div>
      </div>
      <div className="h-4"></div>
      <div className="p-4">
        <AskQuestionCard />
      </div>
      <CommitLog />
    </div>
  );
};

export default Dashboard;
