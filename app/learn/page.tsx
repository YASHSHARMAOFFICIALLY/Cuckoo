import LearnHero from "@/components/learn/LearnHero"
import BlogSection from "@/components/learn/BlogSection";
import VideoSection from "@/components/learn/videosection";
import BooksSection from "@/components/learn/booksection";
import FinanceConcepts from "@/components/learn/FinanceConcept";
import LearningPath from "@/components/learn/learningpath";
import Newsletter from "@/components/learn/Newsletter";

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-[#F0F0F0]" />
    </div>
  );
}

export default function LearnPage() {
  return (
    <div className="bg-white min-h-screen">
      <LearnHero />
      <SectionDivider />
      <BlogSection />
      <SectionDivider />
      <VideoSection />
      <SectionDivider />
      <BooksSection />
      <SectionDivider />
      <FinanceConcepts />
      <SectionDivider />
      <LearningPath />
      <SectionDivider />
      <Newsletter />
    </div>
  );
}