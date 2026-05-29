"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import {
  CalendarPlus,
  CircleQuestionMark,
  LaptopMinimalCheck,
  Menu,
  ScanEye,
  X,
  type LucideIcon,
} from "lucide-react";

import { FeedbackDialog } from "@/components/feedback-dialog";
import { ComponentPreview } from "@/components/component-preview";
import { PlayGuideThumb } from "@/components/play-guide-thumb";
import {
  components,
  type ComponentCategory,
  type ComponentItem,
} from "@/lib/components-data";

export default function ComponentsPage() {
  const [activeSlug, setActiveSlug] = useState(
    components[0].items[0].slug,
  );

  const { active, category } = useMemo(() => {
    for (const cat of components) {
      const found = cat.items.find((it) => it.slug === activeSlug);
      if (found) return { active: found, category: cat };
    }
    return {
      active: components[0].items[0],
      category: components[0],
    };
  }, [activeSlug]);

  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(active.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-zinc-200 lg:h-screen lg:overflow-hidden">
      <header className="w-full lg:border-b lg:border-zinc-800">
        <div className="relative mx-auto flex h-14 w-full max-w-350 items-center justify-between px-6 lg:border-x lg:border-zinc-800">
          <span className="absolute bottom-0 left-0 z-10 hidden h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-[2.5px] border border-white/6 bg-[#1A1A1A] lg:block" />
          <span className="absolute bottom-0 right-0 z-10 hidden h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-[2.5px] border border-white/6 bg-[#1A1A1A] lg:block" />
          <span className="hidden text-sm font-semibold text-zinc-100 lg:inline">
            Framer Component Library
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-zinc-100 lg:hidden"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
          <div className="flex items-center gap-5 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-400">
              Built by
              <a
                href="https://lander.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-zinc-100 hover:text-white"
              >
                <Image
                  src="/logo.png"
                  alt="Lander Studio"
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-sm object-contain"
                />
                Lander Studio
              </a>
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-full w-full max-w-350 flex-col border-x border-zinc-800">
        <div className="grid h-full flex-1 grid-cols-1 gap-0 lg:grid-cols-[220px_1fr_280px]">
          <aside className="hidden border-r border-zinc-800 px-5 py-6 text-sm lg:block">
            <LayoutGroup>
              {components.map((cat, i) => (
                <div key={cat.slug} className={i > 0 ? "mt-6" : undefined}>
                  <SidebarSection
                    category={cat}
                    activeSlug={activeSlug}
                    onSelect={setActiveSlug}
                  />
                </div>
              ))}
            </LayoutGroup>
          </aside>

          <main className="px-5 pb-6 pt-4 lg:px-10 lg:py-6">
            <nav className="hidden items-center gap-2 text-xs text-zinc-500 lg:flex">
              <span>Components</span>
              <span>›</span>
              <span>{category.name}</span>
              <span>›</span>
              <span className="text-zinc-300">{active.name}</span>
            </nav>

            <div className="mt-0 lg:mt-3">
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <h1 className="text-2xl font-medium tracking-tight text-white">
                  {active.name}
                </h1>
                <button
                  onClick={handleCopy}
                  className="relative inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-zinc-100"
                >
                  <span
                    className={`inline-flex items-center gap-2 ${
                      copied ? "invisible" : ""
                    }`}
                  >
                    <Image
                      src="/framer.png"
                      alt="Framer"
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5 object-contain"
                    />
                    <span className="sm:hidden">Copy</span>
                    <span className="hidden sm:inline">Copy Component</span>
                  </span>
                  {copied && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
              <p className="mt-2 max-w-none text-sm leading-6 text-zinc-400 sm:max-w-md">
                {active.description}
              </p>
            </div>

            <ComponentPreview src="/demo.mp4" />

            <div className="mt-5 flex justify-end">
              <FeedbackDialog />
            </div>
          </main>

          <aside className="hidden border-l border-zinc-800 px-5 py-6 lg:block">
            <PlayGuideThumb src="/demo.mp4" />

            <dl className="mt-5 space-y-3 text-xs">
              <MetaRow
                icon={CalendarPlus}
                label="Created"
                value="Mar 14, 2022"
              />
              <MetaRow
                icon={CircleQuestionMark}
                label="Supported"
                value="Framer"
              />
              <MetaRow icon={ScanEye} label="Access" value="Free" />
              <MetaRow
                icon={LaptopMinimalCheck}
                label="Last updated"
                value="Mar 14, 2022"
              />
            </dl>
          </aside>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl lg:hidden">
          <div className="flex h-14 items-center px-6">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-zinc-100"
            >
              <X className="h-4 w-4" />
              Menu
            </button>
          </div>
          <LayoutGroup>
            <div className="px-6 pb-6 pt-4">
              {components.map((cat, i) => (
                <div key={cat.slug} className={i > 0 ? "mt-6" : undefined}>
                  <SidebarSection
                    category={cat}
                    activeSlug={activeSlug}
                    onSelect={(slug) => {
                      setActiveSlug(slug);
                      setMenuOpen(false);
                    }}
                  />
                </div>
              ))}
            </div>
          </LayoutGroup>
        </div>
      )}

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ease-out ${
          copied
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div className="px-6 py-4 text-center text-sm text-zinc-200">
          Component copied, paste it directly in Framer and make something
          awesome!
        </div>
      </div>
    </div>
  );
}

function SidebarSection({
  category,
  activeSlug,
  onSelect,
}: {
  category: ComponentCategory;
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-medium tracking-wide text-white">
        {category.name}
      </h2>
      <ul className="relative before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-px before:bg-zinc-800">
        {category.items.map((item: ComponentItem) => {
          const isActive = item.slug === activeSlug;
          return (
            <li key={item.slug} className="relative py-1.5">
              {isActive && (
                <motion.span
                  layoutId="sidebar-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute left-0 top-1.5 bottom-1.5 w-px bg-white"
                />
              )}
              <button
                type="button"
                onClick={() => onSelect(item.slug)}
                className={
                  "block w-full cursor-pointer pl-4 text-left text-sm " +
                  (isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200")
                }
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-zinc-400">
      <Icon className="h-3.5 w-3.5 text-zinc-500" strokeWidth={2} />
      <span className="text-zinc-500">{label}:</span>
      <span className="font-medium text-zinc-200">{value}</span>
    </div>
  );
}
