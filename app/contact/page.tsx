import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "اتصل بنا | منهج",
  description: "تواصل مع إدارة منصة منهج للاستفسارات والاقتراحات.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl" dir="rtl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-amiri text-primary mb-4">
          تواصل معنا
        </h1>
        <p className="text-muted-foreground font-noto-naskh text-lg">
          نحن هنا للإجابة على استفساراتكم والاستماع إلى اقتراحاتكم
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 text-right">
          <div>
            <h2 className="text-2xl font-bold font-amiri text-primary mb-6">
              معلومات الاتصال
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/5 p-3 rounded-lg text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold font-amiri text-lg mb-1">
                    البريد الإلكتروني
                  </h3>
                  <p
                    className="text-muted-foreground font-noto-naskh ltr text-right"
                    dir="ltr">
                    contact@manhaj.ai
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/5 p-3 rounded-lg text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold font-amiri text-lg mb-1">الهاتف</h3>
                  <p
                    className="text-muted-foreground font-noto-naskh dir-ltr text-right"
                    dir="ltr">
                    +966 50 000 0000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/5 p-3 rounded-lg text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold font-amiri text-lg mb-1">العنوان</h3>
                  <p className="text-muted-foreground font-noto-naskh">
                    الرياض، المملكة العربية السعودية
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm text-right">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                الاسم الكامل
              </label>
              <Input
                id="name"
                placeholder="أدخل اسمك..."
                className="font-noto-naskh"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                placeholder="أدخل بريدك الإلكتروني..."
                className="font-noto-naskh text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                الموضوع
              </label>
              <Input
                id="subject"
                placeholder="موضوع الرسالة..."
                className="font-noto-naskh"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                الرسالة
              </label>
              <textarea
                id="message"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-noto-naskh"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>

            <Button type="submit" className="w-full font-bold font-noto-naskh">
              إرسال الرسالة
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
