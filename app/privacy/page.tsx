import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | منهج",
  description: "سياسة الخصوصية وحماية البيانات في منصة منهج.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl" dir="rtl">
      <div className="text-right space-y-10">
        <div className="border-b border-border/60 pb-8">
          <h1 className="text-4xl font-bold font-amiri text-primary mb-4">
            سياسة الخصوصية
          </h1>
          <p className="text-muted-foreground font-noto-naskh">
            آخر تحديث: 20 ديسمبر 2024
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ١. مقدمة
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            نحترم في منصة منهج خصوصيتكم ونلتزم بحماية بياناتكم الشخصية. توضح هذه
            السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتكم عند استخدامكم
            للموقع.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٢. البيانات التي نجمعها
          </h2>
          <ul className="list-disc list-inside space-y-2 font-noto-naskh text-foreground/90 mr-4">
            <li>
              المعلومات الشخصية التي تقدمونها عند التسجيل (مثل الاسم والبريد
              الإلكتروني).
            </li>
            <li>بيانات التصفح والاستخدام لتحسين تجربة المستخدم.</li>
            <li>المراسلات التي تقومون بإرسالها إلينا.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٣. استخدام البيانات
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            نستخدم البيانات للأغراض التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 font-noto-naskh text-foreground/90 mr-4">
            <li>تقديم خدماتنا وتحسينها باستمرار.</li>
            <li>التواصل معكم بخصوص التحديثات أو الاستفسارات.</li>
            <li>ضمان أمان وسلامة المنصة.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٤. حماية البيانات
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            نطبق إجراءات أمنية تقنية وإدارية مناسبة لحماية بياناتكم من الوصول
            غير المصرح به أو التغيير أو الإفصاح أو الإتلاف.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-amiri text-secondary">
            ٥. الاتصال بنا
          </h2>
          <p className="text-lg font-noto-naskh leading-loose text-foreground/90">
            إذا كان لديكم أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر
            صفحة "اتصل بنا".
          </p>
        </section>
      </div>
    </div>
  );
}
