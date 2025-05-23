import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import React, { useState } from "react";
import { askQuestion } from "./action";
import { set, string } from "zod";
import { readStreamableValue } from "ai/rsc";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "./code-references";
import Logo from "public/logo";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useRefetch from "@/hooks/use-refetch";

type Props = {};

const AskQuestionCard = (props: Props) => {
  const { project } = useProject();

  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileReferences, setFileReferences] =
    useState<{ fileName: string; sourceCode: string; summary: string }[]>();
  const [answer, setAnswer] = useState("");
  const saveAnswer = api.project.saveAnswer.useMutation();

  const onSubmit = async (e: React.FormEvent) => {
    setAnswer("");
    setFileReferences([]);
    if (!project?.id) return;
    setLoading(true);
    e.preventDefault();

    const { output, fileReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFileReferences(fileReferences);
    for await (const text of readStreamableValue(output)) {
      if (text) {
        setAnswer((ans) => ans + text);
      }
    }
    setLoading(false);
  };

  const refetch = useRefetch();

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[80vw]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>
                <Logo />
              </DialogTitle>
              <Button
                variant={"outline"}
                disabled={saveAnswer.isPending}
                onClick={() => {
                  saveAnswer.mutate(
                    {
                      projectId: project!.id,
                      question,
                      answer,
                      fileReferences,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Answer Saved");
                        refetch();
                      },
                      onError: () => {
                        toast.error("Error in saving answer!");
                      },
                    },
                  );
                }}
              >
                Save Answer
              </Button>
            </div>
          </DialogHeader>
          <MDEditor.Markdown
            source={answer}
            className="h-full max-h-[40vh] max-w-[70vw] overflow-scroll"
          />
          <div className="h-2"></div>
          <CodeReferences fileReferences={fileReferences ?? []} />
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Which file should I edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={loading}>
              Enter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AskQuestionCard;
