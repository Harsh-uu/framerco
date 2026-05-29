"use client";

import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComponentPreview } from "@/components/component-preview";

function formatTime(secs: number) {
  if (!Number.isFinite(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayGuideThumb({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => setDuration(v.duration);
    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 grid place-items-center bg-black/85">
        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#1C1C1C] bg-[#1b1b1b] px-3 py-1.5 text-xs font-medium text-zinc-50 shadow-[0_1px_2px_0_rgba(0,0,0,0.05),inset_0_1px_1.5px_0_rgba(255,255,255,0.08)] hover:bg-[#222]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play guide
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl gap-0 overflow-hidden rounded-2xl border-zinc-800 bg-black p-0">
            <DialogTitle className="sr-only">Play guide</DialogTitle>
            <ComponentPreview
              src={src}
              alwaysShowControls
              className="h-[80vh] rounded-none border-0"
            />
          </DialogContent>
        </Dialog>
      </div>

      <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-2 text-xs font-medium tabular-nums text-white opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        {formatTime(duration)}
      </span>
    </div>
  );
}
