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
import { string } from "zod";
import { readStreamableValue } from "ai/rsc";

type Props = {};

const AskQuestionCard = (props: Props) => {
  const { project } = useProject();

  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileReferences, setFileReferences] =
    useState<{ fileName: string; sourceCode: string; summary: string }[]>();
  const [answer, setAnswer] = useState();

  const onSubmit = async (e: React.FormEvent) => {
    if (!project?.id) return;
    setLoading(true);
    e.preventDefault();
    setOpen(true);

    const { output, fileReferences } = await askQuestion(question, project.id);
    setFileReferences(fileReferences);
    for await (const text of readStreamableValue(output)) {
      if (text) {
        setAnswer((ans) => ans + text);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{question}</DialogTitle>
          </DialogHeader>
          ans: {answer}
          {fileReferences?.map((file) => {
            return <span>{file.fileName}</span>;
          })}
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
            <Button type="submit">Enter</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AskQuestionCard;
