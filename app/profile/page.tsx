import { UserProfile } from "@/components/profile/UserProfile";

export const metadata = {
  title: "الملف الشخصي | منهج.ai",
  description: "الصفحة الشخصية للمستخدم",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <UserProfile />
    </div>
  );
}
