"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  "Trouble with component",
  "Improve exiting component",
  "Request new components",
  "Others",
];

export function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string>("");
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTopic("");
      setIssue("");
      setSubmitted(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#1C1C1C] bg-[#1b1b1b] px-3 py-1.5 text-[0.8rem] text-[#A3A3A3] shadow-[0_1px_2px_0_rgba(0,0,0,0.05),inset_0_1px_1.5px_0_rgba(255,255,255,0.08)] hover:bg-[#222]"
        >
          <Image
            src="/feedback.png"
            alt="Feedback"
            width={12}
            height={12}
            className="h-3 w-3 object-contain"
          />
          Feedback
        </button>
      </DialogTrigger>
      <DialogContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <Image
              src="/debug.png"
              alt="Somebody's about to debug at 2AM"
              width={320}
              height={48}
              className="h-auto w-auto max-w-[80%] object-contain"
            />
            <Image
              src="/doodle.png"
              alt="Doodle"
              width={200}
              height={200}
              className="h-40 w-40 object-contain"
            />
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-xl font-medium text-white sm:text-2xl">
                Submission received
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400 sm:text-base">
                We appreciate you taking the time
                <br />
                to share your experience.
              </DialogDescription>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-medium sm:text-xl">
                Help shape the library
              </DialogTitle>
              <DialogDescription className="text-[0.8rem] sm:text-sm">
                Have suggestions or found a bug? Let us know.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[0.8rem] text-white sm:text-sm">
                  What needs attention? <span className="text-red-500">*</span>
                </label>
                <Select value={topic} onValueChange={setTopic} required>
                  <SelectTrigger className="h-11 rounded-xl border-2 border-[#242424] bg-[#1b1b1b]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.8rem] text-white sm:text-sm">
                  Describe the issue <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Blah blah blahh…."
                  className="min-h-28 w-full resize-none rounded-xl border-2 border-[#242424] bg-[#1b1b1b] px-3 py-2 text-[0.8rem] text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full cursor-pointer rounded-xl bg-zinc-200 px-4 py-2.5 text-base font-medium text-black hover:bg-white sm:text-lg"
              >
                Submit Feedback
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
