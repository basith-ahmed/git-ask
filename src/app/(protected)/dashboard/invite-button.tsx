"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useProject from "@/hooks/use-project";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useState } from "react";

type Props = {};

const InviteButton = (props: Props) => {
  const { selectedProjectId } = useProject();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite a Team Member</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">Copy and Share this link</p>
          <Input
            className="mt-4"
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/join/${selectedProjectId}`,
              );
            }}
            value={`${window.location.origin}/join/${selectedProjectId}`}
          />
        </DialogContent>
      </Dialog>
      <Button size="sm" onClick={() => {setOpen(true)}}>Invite Member</Button>
    </>
  );
};

export default InviteButton;
