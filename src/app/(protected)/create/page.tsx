"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { ArrowRight, Info } from "lucide-react";
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
  const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    if (!!checkCredits.data) {
      createProject.mutate(
        {
          name: data.projectName,
          githubUrl: data.repoUrl,
          githubToken: data.githubToken,
        },
        {
          onSuccess: () => {
            toast.success("Project created successfully");
            refetch();
            reset();
          },
          onError: () => {
            toast.error("Failed to create the project");
          },
        },
      );
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl, githubToken: data.githubToken
      })
    }
  }

  // frontend validation to check whether the user has enough credits,  but we also need to do backend validation
  const hasEnoughCredits = checkCredits?.data?.userCredits ? checkCredits.data.fileCount <= checkCredits.data.userCredits : true

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
            {!!checkCredits.data && (
              <>
              <div className="mt-4 bg-orange-50 px-4 py-2 rounded-md border border-orange-200 text-orange-700">
                <div className="flex items-center gap-2 ">
                  <Info  className="size-4"/>
                  <p className="text-sm">You will be charged <strong>{checkCredits.data?.fileCount}</strong> credits for this repository.</p>
                </div>
                <p className="text-sm text-blue-600 ml-6">You have <strong>{checkCredits.data?.userCredits}</strong> credits remaining.</p>
              </div>
              </>
            )}
            <Button type="submit" disabled={createProject.isPending || checkCredits.isPending || !hasEnoughCredits}>
              {!!checkCredits.data ? 'Create Project' : 'Check Credits'}
              Create Project <ArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
