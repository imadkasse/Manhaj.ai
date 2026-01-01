"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  Bot,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  BookOpen,
  User,
  Link2,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AiResponse = {
  answer: string;
  scholar: string;
  source: string;
  url?: string;
};

const AiPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<AiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (response?.answer) {
      navigator.clipboard.writeText(response.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fetchRes = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/ai", { prompt });
      setResponse(res.data.message);
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (error) {
      setResponse({
        answer: "عذراً، حدث خطأ أثناء الاتصال بالخادم العلمي. يرجى المحاولة لاحقاً.",
        scholar: "نظام التنبيهات",
        source: "خطأ في الشبكة",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setPrompt("");
    setResponse(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 relative overflow-hidden transition-colors duration-500" dir="rtl">
      {/* زخرفة خلفية إسلامية هندسية ناعمة */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5.88 18.09H54.12l-14.76 10.72 5.88 18.09L30 36.18l-15.24 11.09 5.88-18.09L5.88 18.09h18.24L30 0z' fill='%231A4D2E' fill-opacity='1' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")` }} />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        
        {/* رأس الصفحة - الهوية البصرية */}
        <header className="text-center mb-12 space-y-4">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-card rounded-2xl shadow-xl border border-border mb-4 relative"
          >
            <Bot className="h-12 w-12 text-primary" />
            <div className="absolute -bottom-2 -right-2 bg-secondary rounded-lg p-1.5 shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold font-amiri text-primary tracking-tight">
            المستشار الذكي
          </h1>
          <p className="text-muted-foreground font-noto-naskh text-lg max-w-lg mx-auto leading-relaxed">
            استعن بالذكاء الاصطناعي للوصول إلى كنوز المعرفة الشرعية من المصادر الموثوقة.
          </p>
        </header>

        {/* واجهة الإدخال */}
        <AnimatePresence mode="wait">
          {!response ? (
            <motion.div
              key="input-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-border shadow-2xl bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden border-t-4 border-t-primary">
                <CardContent className="p-6 md:p-10">
                  <div className="space-y-6">
                    <div className="relative group">
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="ماذا تريد أن تتعلم اليوم؟ اكتب سؤالك هنا..."
                        className="min-h-[220px] text-xl font-noto-naskh border-none focus-visible:ring-0 bg-transparent p-0 resize-none placeholder:text-muted-foreground/50 leading-loose"
                      />
                      <div className="h-px bg-gradient-to-l from-transparent via-border to-transparent my-4" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-3 text-secondary font-medium bg-secondary/5 px-4 py-2 rounded-md border border-secondary/10">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <span className="text-sm font-noto-naskh">نتائج استرشادية تقريبية.</span>
                      </div>
                      
                      <Button
                        onClick={fetchRes}
                        disabled={loading || !prompt.trim()}
                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 rounded-md shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:translate-y-0 text-lg font-bold group"
                      >
                        {loading ? (
                          <RefreshCw className="h-6 w-6 animate-spin text-primary-foreground" />
                        ) : (
                          <div className="flex items-center gap-3">
                            <span>استخرج الإجابة</span>
                            <Send className="h-5 w-5 rotate-180 group-hover:translate-x-[-4px] transition-transform" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* واجهة الإجابة */
            <motion.div 
              key="response-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
              ref={responseRef}
            >
              {/* تذكير بالسؤال */}
              <div className="flex items-start gap-4 flex-row-reverse">
                <div className="bg-primary/10 border border-primary/20 px-6 py-4 rounded-xl rounded-tr-none shadow-sm text-primary max-w-[85%]">
                  <p className="font-noto-naskh italic text-lg leading-relaxed">{prompt}</p>
                </div>
              </div>

              {/* بطاقة الإجابة الموثقة */}
              <Card className="border-border shadow-2xl rounded-lg overflow-hidden bg-card border-r-4 border-r-secondary relative">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-10 border-b border-border pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg shadow-inner">
                        <BookOpen className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-amiri text-primary">تحقيق المسألة</h2>
                        <span className="text-xs text-muted-foreground font-sans uppercase tracking-widest">AI Generated Scholarly Response</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={copyToClipboard} 
                      className="rounded-full border-border hover:bg-accent text-muted-foreground transition-all"
                    >
                      {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>

                  <div className="prose prose-slate prose-lg max-w-none mb-10">
                    <p className="font-noto-naskh leading-[2.3] text-foreground/90 whitespace-pre-wrap text-xl">
                      {response.answer}
                    </p>
                  </div>

                  {/* تفاصيل المصادر */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {response.scholar && (
                      <div className="flex items-center gap-4 p-5 bg-background rounded-md border border-border hover:border-secondary/30 transition-colors">
                        <User className="h-6 w-6 text-secondary shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground font-sans uppercase">المرجع العلمي</p>
                          <p className="font-bold text-primary font-noto-naskh">{response.scholar}</p>
                        </div>
                      </div>
                    )}
                    {response.source && (
                      <div className="flex items-center gap-4 p-5 bg-background rounded-md border border-border hover:border-secondary/30 transition-colors">
                        <BookOpen className="h-6 w-6 text-secondary shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground font-sans uppercase">المصدر المرجعي</p>
                          <p className="font-bold text-primary font-noto-naskh">{response.source}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {response.url && (
                    <a 
                      href={response.url} 
                      target="_blank" 
                      className="mt-6 flex items-center justify-center gap-3 p-4 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-md border border-primary/10 transition-all group"
                    >
                      <Link2 className="h-5 w-5 text-secondary" />
                      الاطلاع على الأصل في المصدر
                      <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </a>
                  )}

                  <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-6">
                    <Button 
                      onClick={resetChat} 
                      variant="default" 
                      className="bg-primary text-primary-foreground rounded-full px-12 py-7 font-noto-naskh text-lg shadow-xl shadow-primary/10"
                    >
                      <RefreshCw className="ml-3 h-5 w-5" />
                      بحث جديد
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center max-w-sm font-sans">
                      هذا النظام يعتمد على خوارزميات الذكاء الاصطناعي. يُنصح دائماً بمراجعة المصادر الأصلية والتواصل مع أهل العلم الموثوقين.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* مميزات النظام (تظهر في البداية فقط) */}
        {!response && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "أصالة المصدر", desc: "ربط النتائج بكتب العلماء المعتمدة." },
              { title: "دقة البحث", desc: "تحليل سياقي متطور للنصوص القديمة." },
              { title: "أمان شرعي", desc: "تنبيهات مستمرة حول طبيعة الذكاء الاصطناعي." }
            ].map((f, i) => (
              <div key={i} className="group p-6 rounded-lg bg-card/50 border border-border hover:border-secondary/20 transition-all text-center">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-primary mb-2 font-amiri text-lg">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-noto-naskh">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AiPage;