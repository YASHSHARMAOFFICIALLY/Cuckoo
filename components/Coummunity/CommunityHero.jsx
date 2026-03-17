'use client'
import { useEffect,useRef } from "react";


const COMMUNITY_STAT = [
    { value: "4,200+", label: "Members" },
  { value: "1,840", label: "Discussions" },
  { value: "98%", label: "Answered" },
  { value: "12K+", label: "Replies" },
]



export default function CommunityHero({onStartDiscussion}){
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        requestAnimationFrame(() => {
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        });
    }, []);
    return (
        <section className="bg-white border-b border-[#EBEBEB] px-6 py-12">
            <div className="max-w-5xl mx-auto">
                <div ref = {ref} className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E8DFCO] mb-5 ">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                                        <span className="text-[12px] text-[#8B7340] font-medium tracking-wide">
                                            Community · Finance Learners
                        </span>
                        </div>
                                                    <h1
                                        className="text-[38px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0F0F0F] mb-4"
                                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                        >
                                        Learn Finance{" "}
                                        <span className="text-[#C9A84C]">Together</span>
                                        </h1>
                            
                                        <p className="text-[15.5px] leading-[1.7] text-[#555] mb-7 tracking-[-0.01em]">
                                        Ask questions, share insights, and grow alongside a community of
                                        finance learners — from beginners to seasoned investors.
                                        </p>
                            
                                        <div className="flex items-center gap-3 flex-wrap">
                                        <button
                                            onClick={onStartDiscussion}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F0F0F] text-white text-[13.5px] font-medium rounded-xl hover:bg-[#2a2a2a] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-200 tracking-[-0.01em]"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M7 2V12M2 7H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            Start a Discussion
                                        </button>
                                        <a
                                            href="#feed"
                                            className="text-[13.5px] text-[#888] hover:text-[#0F0F0F] transition-colors tracking-[-0.01em]"
                                        >
                                            Browse discussions →
                                        </a>
                                        </div>
                                    </div>
                            
                                    {/* Right: stats */}
                                    <div className="grid grid-cols-2 gap-3 md:min-w-[260px]">
                                        {COMMUNITY_STATS.map(({ value, label }) => (
                                        <div
                                            key={label}
                                            className="bg-[#FAFAF8] border border-[#EBEBEB] rounded-2xl px-5 py-4 text-center"
                                        >
                                            <div
                                            className="text-[26px] font-bold text-[#0F0F0F] tracking-[-0.04em] leading-none mb-1"
                                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                            >
                                            {value}
                                            </div>
                                            <div className="text-[12px] text-[#888]">{label}</div>
                                        </div>
                                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}