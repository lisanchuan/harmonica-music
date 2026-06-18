'use client';

import { useState } from 'react';
import { HarmonicaType } from '@/lib/tuner/types';
import HarmonicaSelector from '@/components/tuner/HarmonicaSelector';
import TunerMain from '@/components/tuner/TunerMain';

export default function TunerPage() {
  const [type, setType] = useState<HarmonicaType | null>(null);

  if (!type) {
    return <HarmonicaSelector onSelect={setType} />;
  }

  return (
    <TunerMain
      harmonicaType={type}
      onBack={() => setType(null)}
    />
  );
}
