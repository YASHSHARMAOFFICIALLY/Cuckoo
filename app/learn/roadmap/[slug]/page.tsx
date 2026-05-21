"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ROADMAP_TOPICS, RoadmapTopic } from "@/data/roadmapTopics";
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, BookOpen, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";

export default function RoadmapTopicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const topic = ROADMAP_TOPICS[slug];

  const [isCompleted, setIsCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (topic) {
      const completedSteps = JSON.parse(localStorage.getItem("financeflow_completed_steps") || "{}");
      setIsCompleted(!!completedSteps[slug]);
    }
  }, [slug, topic]);

  // CHANGED: added local storage tracking for roadmap progress
  const toggleCompletion = () => {
    const completedSteps = JSON.parse(localStorage.getItem("financeflow_completed_steps") || "{}");
    if (isCompleted) {
      delete completedSteps[slug];
      setIsCompleted(false);
    } else {
      completedSteps[slug] = true;
      setIsCompleted(true);
    }
    localStorage.setItem("financeflow_completed_steps", JSON.stringify(completedSteps));
  };

  if (!topic) {
    return notFound();
  }

  const prevTopic = topic.prevStep ? ROADMAP_TOPICS[topic.prevStep] : null;
  const nextTopic = topic.nextStep ? ROADMAP_TOPICS[topic.nextStep] : null;

  if (!mounted) return null; // Prevent hydration mismatch for localStorage dependent UI

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black text-[#0F0F0F] dark:text-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#666] dark:text-[#AAA] hover:text-[#0F0F0F] dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roadmap
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] dark:bg-[#1A1A1A] dark:border-[#333] dark:text-[#C9A84C]">
              {topic.badge}
            </span>
            <span className="text-sm text-[#888] dark:text-[#AAA] font-medium">{topic.duration}</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-6 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {topic.title}
          </h1>
          <p className="text-lg text-[#666] dark:text-[#CCC] leading-relaxed max-w-2xl">
            {topic.overview}
          </p>
        </div>

        {/* Progress Action */}
        <div className="bg-white dark:bg-[#0A0A0A] border border-[#E8E8E8] dark:border-[#222] rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCompletion}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isCompleted
                  ? "bg-[#C9A84C] text-white shadow-[0_0_15px_rgba(201,168,76,0.4)]"
                  : "bg-[#F0F0F0] dark:bg-[#1A1A1A] text-[#AAA] dark:text-[#666] hover:bg-[#E8E8E8] dark:hover:bg-[#222]"
              }`}
            >
              {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
            </button>
            <div>
              <h3 className="text-base font-semibold mb-1">
                {isCompleted ? "Step Completed!" : "Mark as Complete"}
              </h3>
              <p className="text-sm text-[#666] dark:text-[#AAA]">
                {isCompleted ? "Great job. You can review the materials anytime." : "Track your progress on the roadmap."}
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Articles Section */}
          {topic.articles.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-[#C9A84C]" />
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">Curated Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {topic.articles.map((article, i) => (
                  <a
                    key={i}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 bg-white dark:bg-[#0A0A0A] border border-[#E8E8E8] dark:border-[#222] rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:border-[#444] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">
                      {article.source}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-[#C9A84C] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#666] dark:text-[#AAA] mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F0F0F] dark:text-white group-hover:text-[#C9A84C]">
                      Read Article <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Videos Section */}
          {topic.videos.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <PlayCircle className="w-5 h-5 text-[#C9A84C]" />
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">Recommended Videos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topic.videos.map((video, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden bg-[#E8E8E8] dark:bg-[#1A1A1A] border border-[#E8E8E8] dark:border-[#222]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3 className="text-base font-medium px-1">{video.title}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Books Section */}
          {topic.books.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-[#C9A84C]" />
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">Recommended Books</h2>
              </div>
              <div className="flex flex-col gap-4">
                {topic.books.map((book, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row gap-4 p-5 bg-white dark:bg-[#0A0A0A] border border-[#E8E8E8] dark:border-[#222] rounded-2xl"
                  >
                    <div className="w-12 h-16 bg-[#F0F0F0] dark:bg-[#1A1A1A] rounded flex-shrink-0 flex items-center justify-center border border-[#E8E8E8] dark:border-[#333]">
                      <span className="text-[#AAA] font-serif text-sm">Book</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1">{book.title}</h3>
                      <div className="text-sm font-medium text-[#888] mb-2">By {book.author}</div>
                      <p className="text-sm text-[#666] dark:text-[#AAA]">{book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-20 pt-8 border-t border-[#E8E8E8] dark:border-[#222] flex flex-col sm:flex-row justify-between gap-4">
          {prevTopic ? (
            <Link
              href={`/learn/roadmap/${prevTopic.slug}`}
              className="flex flex-col items-start p-4 rounded-2xl hover:bg-[#F5F5F5] dark:hover:bg-[#111] transition-colors group flex-1"
            >
              <span className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2 flex items-center gap-1">
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </span>
              <span className="text-lg font-medium group-hover:text-[#C9A84C] transition-colors">
                {prevTopic.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}

          {nextTopic ? (
            <Link
              href={`/learn/roadmap/${nextTopic.slug}`}
              className="flex flex-col items-end text-right p-4 rounded-2xl hover:bg-[#F5F5F5] dark:hover:bg-[#111] transition-colors group flex-1"
            >
              <span className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2 flex items-center gap-1">
                Next <ChevronRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-lg font-medium group-hover:text-[#C9A84C] transition-colors">
                {nextTopic.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}
