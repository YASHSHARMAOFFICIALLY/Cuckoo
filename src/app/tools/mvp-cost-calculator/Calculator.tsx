"use client";

import { useMemo, useState } from "react";
import { CALENDLY_URL } from "@/components/ui/CallButton";

const projectTypes = [
  { label: "Landing page", cost: 3500, weeks: 2 },
  { label: "MVP", cost: 9500, weeks: 4 },
  { label: "Web app", cost: 15000, weeks: 6 },
  { label: "AI integration", cost: 7500, weeks: 3 },
];

const scopeOptions = [
  { label: "Lean", hint: "One core flow", factor: 0.8 },
  { label: "Standard", hint: "A focused first release", factor: 1 },
  { label: "Complex", hint: "Several roles or workflows", factor: 1.55 },
];

const platforms = [
  { label: "Web only", factor: 1 },
  { label: "Web + responsive app", factor: 1.25 },
  { label: "Web + mobile apps", factor: 1.7 },
];

const timelines = [
  { label: "Flexible", costFactor: 0.95, weekFactor: 1.2 },
  { label: "Standard", costFactor: 1, weekFactor: 1 },
  { label: "Fast-track", costFactor: 1.25, weekFactor: 0.75 },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function ChoiceGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { label: string; hint?: string }[];
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-zinc-700">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => (
          <label
            key={option.label}
            className={`cursor-pointer rounded-xl border p-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink has-[:focus-visible]:ring-offset-2 ${
              value === index ? "border-accent bg-orange-50" : "border-line bg-white hover:border-zinc-300"
            }`}
          >
            <input
              type="radio"
              name={legend}
              value={index}
              checked={value === index}
              onChange={() => onChange(index)}
              className="sr-only"
            />
            <span className="flex items-center gap-2.5 font-medium">
              <span
                className={`size-3.5 rounded-full border ${value === index ? "border-4 border-accent" : "border-zinc-400"}`}
                aria-hidden
              />
              {option.label}
            </span>
            {option.hint && <span className="mt-1 block pl-6 text-sm text-muted">{option.hint}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function Calculator() {
  const [project, setProject] = useState(1);
  const [scope, setScope] = useState(1);
  const [platform, setPlatform] = useState(0);
  const [timeline, setTimeline] = useState(1);

  const estimate = useMemo(() => {
    const selectedProject = projectTypes[project];
    const cost = selectedProject.cost * scopeOptions[scope].factor * platforms[platform].factor * timelines[timeline].costFactor;
    const weeks = selectedProject.weeks * scopeOptions[scope].factor * platforms[platform].factor * timelines[timeline].weekFactor;

    return {
      low: Math.round((cost * 0.85) / 500) * 500,
      high: Math.round((cost * 1.2) / 500) * 500,
      startWeek: Math.max(1, Math.round(weeks * 0.85)),
      endWeek: Math.max(2, Math.ceil(weeks * 1.2)),
    };
  }, [platform, project, scope, timeline]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
      <form className="card space-y-7 p-5 sm:p-7" onSubmit={(event) => event.preventDefault()}>
        <ChoiceGroup legend="What are you building?" options={projectTypes} value={project} onChange={setProject} />
        <ChoiceGroup legend="How much is in version one?" options={scopeOptions} value={scope} onChange={setScope} />
        <ChoiceGroup legend="Where will it run?" options={platforms} value={platform} onChange={setPlatform} />
        <ChoiceGroup legend="How quickly do you need it?" options={timelines} value={timeline} onChange={setTimeline} />
      </form>

      <aside className="card top-24 overflow-hidden lg:sticky" aria-live="polite">
        <div className="bg-ink p-6 text-white sm:p-7">
          <p className="text-sm font-medium text-white/60">Your planning estimate</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            {money.format(estimate.low)}–{money.format(estimate.high)}
          </p>
          <p className="mt-2 text-base text-white/70">
            Approximately {estimate.startWeek}–{estimate.endWeek} weeks
          </p>
        </div>
        <div className="p-6 sm:p-7">
          <p className="text-sm leading-relaxed text-muted">
            This is a directional estimate for design and development, not a quote. Final scope, integrations, and existing assets can change it.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Discuss your estimate
          </a>
        </div>
      </aside>
    </div>
  );
}
