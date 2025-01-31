'use client';

import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('@/components/canvas/Canvas'), { ssr: false });

export default function ClientCanvas() {
  return <Canvas />;
}