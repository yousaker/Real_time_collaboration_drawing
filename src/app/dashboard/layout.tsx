import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in'); // إعادة التوجيه إذا لم يكن المستخدم مسجلاً
  }

  return <div>{children}</div>;
}