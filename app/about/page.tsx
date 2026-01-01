import { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن المنصة | منهج",
  description: "تعرف على منصة منهج وأهدافها في نشر العلم الشرعي الأصيل.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl" dir="rtl">
      <div className="space-y-12 text-right">
        {/* Header */}
        <div className="text-center md:text-right">
          <h1 className="text-4xl font-bold font-amiri text-primary mb-6">
            عن منصة منهج
          </h1>
          <p className="text-xl text-muted-foreground font-noto-naskh leading-relaxed">
            منصة علمية إسلامية تهدف إلى تيسير الوصول إلى العلم الشرعي الموثوق.
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold font-amiri text-secondary mb-4">
            رسالتنا
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            نحمل على عاتقنا مسؤولية الحفاظ على التراث العلمي الإسلامي وإتاحته
            لطلاب العلم والباحثين وعموم المسلمين بصورة عصرية ميسرة، مع الالتزام
            الكامل بالمنهجية العلمية الرصينة المستمدة من الكتاب والسنة بفهم سلف
            الأمة.
          </p>
        </section>

        {/* Goals Section */}
        <section>
          <h2 className="text-3xl font-bold font-amiri text-primary mb-8 border-b border-border/60 pb-4">
            أهدافنا
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                ١
              </div>
              <div>
                <h3 className="text-xl font-bold font-amiri mb-2">
                  نشر العلم النافع
                </h3>
                <p className="text-muted-foreground font-noto-naskh">
                  إتاحة الفتاوى والمقالات العلمية لكبار العلماء في مكان واحد.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                ٢
              </div>
              <div>
                <h3 className="text-xl font-bold font-amiri mb-2">
                  التوثيق العلمي
                </h3>
                <p className="text-muted-foreground font-noto-naskh">
                  ربط المعلومات بمصادرها الأصلية لضمان الدقة والأمانة العلمية.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                ٣
              </div>
              <div>
                <h3 className="text-xl font-bold font-amiri mb-2">
                  محاربة البدع
                </h3>
                <p className="text-muted-foreground font-noto-naskh">
                  تبيين الحق بدليله والرد على الشبهات بمنهج علمي رصين.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                ٤
              </div>
              <div>
                <h3 className="text-xl font-bold font-amiri mb-2">
                  تيسير الوصول
                </h3>
                <p className="text-muted-foreground font-noto-naskh">
                  استخدام التقنيات الحديثة لتصنيف وفهرسة العلم الشرعي.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
