import LearnHero from "@/components/learn/LearnHero"
import BlogSection from "@/components/learn/BlogSection";
import VideoSection from "@/components/learn/videosection";
import BooksSection from "@/components/learn/booksection";
import FinanceConcepts from "@/components/learn/FinanceConcept";
import LearningPath from "@/components/learn/learningpath";
import Newsletter from "@/components/learn/Newsletter";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-[#F0F0F0] dark:bg-[#222]" />
    </div>
  );
}

export default function LearnPage() {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <LearnHero />
        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#F0F0F0]" />
        </div>
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
      </main>
      <Footer />
    </div>
  );
}
 
