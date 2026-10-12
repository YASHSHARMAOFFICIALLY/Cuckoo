import CallButton from "@/components/ui/CallButton";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section>
      <Reveal className="wrap flex flex-col items-center py-20 text-center sm:py-24">
        <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-h2 sm:leading-[1.1] lg:text-[3.5rem]">
          Have something you want built?
        </h2>
        <p className="mt-4 max-w-md text-lg text-pretty text-muted">
          Book a free 15-minute call. We’ll talk through your idea and tell you exactly how we’d ship it.
        </p>
        <div className="mt-9">
          <CallButton>Book a free 15-min call</CallButton>
        </div>
      </Reveal>
    </section>
  );
}
