import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  // انتظر حتى يتم تحميل بيانات المستخدم
  if (!isLoaded) return null;

  if (!user) {
    redirect('/sign-in'); // إعادة التوجيه إذا لم يكن المستخدم مسجلاً
  }

  return <div>{children}</div>;
}
