"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();

  function onSubmit(data: FormInput) {
    window.alert(JSON.stringify(data));
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
            <Button type="submit">
              Create Project <ArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
