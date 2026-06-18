'use client';
import { useRouter } from 'next/navigation';

export default function BackButton({ label = '← 返回' }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      }}
      className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm"
    >
      {label}
    </button>
  );
}
