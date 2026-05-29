"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(secs: number) {
  if (!Number.isFinite(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ComponentPreview({
  src,
  alwaysShowControls = false,
  className,
}: {
  src: string;
  alwaysShowControls?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const scrubbingRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(null);
  const seekScheduledRef = useRef(false);

  const [controlsShown, setControlsShown] = useState(alwaysShowControls);
  const [idleVisible, setIdleVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);

  const autoControls = alwaysShowControls || isFullscreen;
  const showControls = autoControls ? idleVisible : controlsShown;

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    if (!autoControls) return;
    const el = wrapRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      setIdleVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIdleVisible(false), 2000);
    };
    show();
    el.addEventListener("pointermove", show);
    el.addEventListener("pointerdown", show);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("pointermove", show);
      el.removeEventListener("pointerdown", show);
    };
  }, [autoControls]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => setDuration(v.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    if (v.readyState >= 1 && Number.isFinite(v.duration)) setDuration(v.duration);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("durationchange", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    let raf = 0;
    const tick = () => {
      if (!scrubbingRef.current) setCurrent(v.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("durationchange", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  function toggleFullscreen() {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  }

  function timeFromClientX(clientX: number) {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (clientX - rect.left) / rect.width),
    );
    return ratio * duration;
  }

  function flushSeek() {
    seekScheduledRef.current = false;
    const t = pendingSeekRef.current;
    if (t == null) return;
    pendingSeekRef.current = null;
    const v = videoRef.current;
    if (!v) return;
    const fastSeek = (v as HTMLVideoElement & { fastSeek?: (t: number) => void })
      .fastSeek;
    if (typeof fastSeek === "function") fastSeek.call(v, t);
    else v.currentTime = t;
  }

  function scheduleSeek(t: number) {
    pendingSeekRef.current = t;
    if (seekScheduledRef.current) return;
    seekScheduledRef.current = true;
    requestAnimationFrame(flushSeek);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubbingRef.current = true;
    setIsScrubbing(true);
    const t = timeFromClientX(e.clientX);
    setScrubValue(t);
    scheduleSeek(t);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!scrubbingRef.current) return;
    const t = timeFromClientX(e.clientX);
    setScrubValue(t);
    scheduleSeek(t);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!scrubbingRef.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    scrubbingRef.current = false;
    setIsScrubbing(false);
    flushSeek();
  }

  const displayTime = isScrubbing ? scrubValue : current;
  const pct = duration > 0 ? (displayTime / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className={
        "group relative w-full overflow-hidden bg-[#131416] " +
        (className ?? "mt-6 h-72 rounded-lg border border-zinc-800 sm:h-96")
      }
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onClick={showControls ? togglePlay : undefined}
        className={
          "absolute inset-0 h-full w-full object-cover " +
          (showControls ? "cursor-pointer" : "")
        }
      />

      {!autoControls && (
        <button
          onClick={() => setControlsShown((s) => !s)}
          className="absolute right-2 top-2 z-20 -translate-y-12 cursor-pointer rounded-full bg-[#0e0e0e]/80 px-3 py-2 text-xs text-[#DBDBDB] opacity-0 backdrop-blur transition-all duration-300 ease-out hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
        >
          {controlsShown ? "Hide Controls" : "Show Controls"}
        </button>
      )}

      {(showControls || autoControls) && (
        <div
          className={
            "absolute inset-x-3 bottom-3 z-10 flex items-center gap-3 rounded-full bg-black/70 px-3 py-2 text-xs text-white backdrop-blur transition-all duration-300 ease-out " +
            (showControls
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-16 opacity-0")
          }
        >
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <span className="tabular-nums">{formatTime(displayTime)}</span>

          <div
            ref={barRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative h-4 flex-1 cursor-pointer touch-none select-none"
          >
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span
              className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
              style={{ left: `${pct}%` }}
            />
          </div>

          <span className="tabular-nums">{formatTime(duration)}</span>

          <button
            onClick={toggleFullscreen}
            aria-label="Fullscreen"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isFullscreen ? (
                <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
              ) : (
                <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
              )}
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
