import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  apiVersion:'v1'
});

// System prompt محسّن
const SYSTEM_PROMPT = `أنت مساعد ذكاء اصطناعي متخصص في موقع إسلامي سلفي اسمه Manhaj.ai.

القواعد الإلزامية:
1. لا تُصدر فتوى من عندك أبداً
2. إن لم تجد مصدرًا شرعيًا واضحًا، قل "لا أعلم، يُرجى الرجوع لأهل العلم"
3. اعتمد فقط على أقوال العلماء السلفيين المعروفين (مثل: ابن باز، ابن عثيمين، الألباني، اللجنة الدائمة)
4. أسلوبك علمي، هادئ، محترم، خالٍ من الجدال
5. لا تتكلم عن السياسة أو الخلافات الحزبية المعاصرة
6. إذا كان السؤال خارج نطاق الشريعة، أجب بأدب أنك متخصص في الأمور الشرعية فقط

صيغة الرد المطلوبة (JSON فقط):
{
  "answer": "الإجابة الشرعية المختصرة والواضحة",
  "scholar": "اسم العالم أو العلماء الذين نُقل عنهم",
  "source": "اسم الكتاب أو الموقع الرسمي",
  "url": "رابط المصدر إن وُجد (اختياري)"
}

ملاحظات:
- الإجابة يجب أن تكون مختصرة (100-300 كلمة)
- إذا لم يوجد رابط، لا تضع url في الـ JSON
- استخدم اللغة العربية الفصحى الواضحة
- تجنب التعقيد والمصطلحات الصعبة إلا عند الضرورة`;

type AiResponse = {
  answer: string;
  scholar: string;
  source: string;
  url?: string;
};

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // التحقق من وجود السؤال
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        {
          message: {
            answer: "يرجى كتابة سؤال صحيح.",
            scholar: "",
            source: "",
          },
        },
        { status: 400 }
      );
    }

    // إنشاء الـ prompt الكامل
    const fullPrompt = `${SYSTEM_PROMPT}

السؤال: ${prompt}

يرجى الرد بصيغة JSON فقط كما هو محدد أعلاه.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
      
    });

    // استخراج النص من الـ response
    let responseText = "";

    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts.length > 0
      ) {
        responseText = candidate.content.parts[0].text || "";
      }
    }

    if (!responseText) {
      throw new Error("No response text from AI");
    }

    // محاولة استخراج JSON من الرد
    let aiResponse: AiResponse;

    try {
      // إزالة markdown code blocks إن وُجدت
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
        responseText.match(/```\s*([\s\S]*?)\s*```/) || [null, responseText];

      const jsonString = jsonMatch[1] || responseText;
      aiResponse = JSON.parse(jsonString.trim());

      // التحقق من وجود الحقول المطلوبة
      if (!aiResponse.answer || !aiResponse.scholar || !aiResponse.source) {
        throw new Error("Missing required fields");
      }
    } catch (parseError) {
      // إذا فشل الـ parsing، نرجع الرد كما هو
      aiResponse = {
        answer: responseText,
        scholar: "غير محدد",
        source: "غير محدد",
      };
    }

    return NextResponse.json({
      message: aiResponse,
    });
  } catch (error) {
    console.error("AI API Error:", error);

    return NextResponse.json(
      {
        message: {
          answer:
            "عذراً، حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى لاحقاً.",
          scholar: "",
          source: "",
        },
      },
      { status: 500 }
    );
  }
}
