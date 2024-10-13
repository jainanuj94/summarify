import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Content from "@/components/Content";
import {Toaster} from "@/components/ui/toaster";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center
        min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Header/>
            <main className="w-full h-full">
                <Content/>
            </main>
            <Toaster/>
            <Footer/>
        </div>
    );
}
