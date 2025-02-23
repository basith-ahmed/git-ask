import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import React from "react";
import { toast } from "sonner";

type Props = {};

const ArchiveButton = (props: Props) => {
  const archiveProject = api.project.archiveProject.useMutation();
  const { selectedProjectId } = useProject();
  const refetch = useRefetch();

  return (
    <Button
      disabled={archiveProject.isPending}
      size="sm"
      variant="destructive"
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to archive this project?",
        );
        if (confirm) {
          archiveProject.mutate(
            { projectId: selectedProjectId },
            {
              onSuccess: () => {
                toast.success("Project Archived.");
                refetch();
              },
              onError: () => {
                toast.error("Project couldn't be archived, try again later");
              },
            },
          );
        }
      }}
    >Archive Project</Button>
  );
};

export default ArchiveButton;
