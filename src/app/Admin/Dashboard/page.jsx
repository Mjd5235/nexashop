"use client"
import dynamic from 'next/dynamic';

const DashboardClient = dynamic(() => import('./Dashboard'), {
  ssr: false,
  loading: () => <div></div>
});

export default function Page() {
  return <DashboardClient />;
}