import { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام | منهج",
  description: "شروط وأحكام استخدام منصة منهج.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl" dir="rtl">
      <div className="text-right space-y-10">
        <div className="border-b border-border/60 pb-8">
          <h1 className="text-4xl font-bold font-amiri text-primary mb-4">
            شروط الاستخدام
          </h1>
          <p className="text-muted-foreground font-noto-naskh">
            آخر تحديث: 20 ديسمبر 2024
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ١. الموافقة على الشروط
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            بوصولكم إلى منصة منهج واستخدامها، فإنكم توافقون على الالتزام بشروط
            الاستخدام هذه وجميع القوانين واللوائح المعمول بها.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٢. حقوق الملكية الفكرية
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            جميع المحتويات المنشورة على المنصة (النصوص، التصاميم، الشعارات)
            محمية بموجب حقوق الملكية الفكرية. يُسمح بالاستفادة الشخصية والعلمية
            مع وجوب عزو المحتوى للمنصة وعدم استخدامه لأغراض تجارية دون إذن.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٣. سلوك المستخدم
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            يجب استخدام المنصة لأغراض مشروعة فقط. يُحظر أي سلوك قد يضر بالمنصة
            أو بمستخدميها، أو يخالف التعاليم الإسلامية والآداب العامة.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٤. إخلاء المسؤولية
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            تسعى المنصة لضمان دقة المحتوى العلمي وصحته، ولكنها لا تقدم ضمانات
            مطلقة بشأن خلوه من الأخطاء غير المقصودة. المحتوى المقدم هو للأغراض
            التعليمية والتثقيفية.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٥. التعديلات
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            تحتفظ المنصة بالحق في تعديل هذه الشروط في أي وقت. يُنصح بمراجعة هذه
            الصفحة بشكل دوري للاطلاع على أي تغييرات.
          </p>
        </section>
      </div>
    </div>
  );
}
