import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto py-12 border-t-4 border-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-amiri text-secondary mb-4">
              manhaj.ai
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed max-w-sm font-light">
              منصة علمية إسلامية تهدف إلى نشر العلم الشرعي الصحيح المستمد من
              الكتاب والسنة بفهم سلف الأمة، وتسهيل الوصول إلى فتاوى ومقالات
              العلماء الراسخين.
            </p>
          </div>

          <div>
            <h4 className="font-bold font-amiri text-lg mb-4 text-secondary/80">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-white transition-colors">
                  الفتاوى والمقالات
                </Link>
              </li>
              <li>
                <Link
                  href="/scholars"
                  className="hover:text-white transition-colors">
                  العلماء
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors">
                  عن المنصة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-amiri text-lg mb-4 text-secondary/80">
              تواصل معنا
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-primary-foreground/40 font-light dir-ltr">
          &copy; {new Date().getFullYear()} Manhaj.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
