
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer"
import Newsletter from "@/components/learn/Newsletter";
import QuizHero from "@/components/Quiz/Quizhero"
import Quizresult from "@/components/Quiz/QuizResult"
import QuizCard from "@/components/Quiz/QuizCard"
import Progessbar from "@/components/Quiz/Progressbar"
import FeedbackSection from "@/components/Quiz/FeedbackSection";
import QuizPage from "@/components/Quiz/QuizPage"

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-[#F0F0F0] dark:bg-[#222]" />
    </div>
  );
}
export default function LearnPage() {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] min-h-screen font-sans antialiased" >
      <Navbar />
      <main className="mt-40">
       <QuizPage/>
      <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
 
