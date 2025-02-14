"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
  projectName: string;
  repoUrl: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    createProject.mutate({
      name: data.projectName,
      githubUrl: data.repoUrl,
      githubToken: data.githubToken
    }, {
        onSuccess: () => {
            toast.success("Project created successfully")
            refetch();
            reset();
        },
        onError: () => {
            toast.error("Failed to create the project")
        }
    });
    return true;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Connect your GitHub repository to GitAsk
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link it to GitAsk
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="my-4 space-y-2">
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              required
            />
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="GitHub URL"
              type="url"
              required
            />
            <Input
              {...register("githubToken")}
              placeholder="GitHub access token For private repository access (optional)"
            />
            <Button type="submit" disabled={createProject.isPending}>
              Create Project <ArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
