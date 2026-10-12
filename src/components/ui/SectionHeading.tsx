import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; sub?: string };

export default function SectionHeading({ eyebrow, title, sub }: Props) {
  return (
    <Reveal className="max-w-4xl">
      <p className="text-sm font-medium text-muted">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-h2 sm:leading-[1.1] lg:text-[3.5rem]">{title}</h2>
      {sub && <p className="mt-4 text-lg text-pretty text-muted">{sub}</p>}
    </Reveal>
  );
}
