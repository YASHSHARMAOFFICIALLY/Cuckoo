import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer"
import Newsletter from "@/components/learn/Newsletter";
import QuizPage from "@/components/Quiz/QuizPage"
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
 
