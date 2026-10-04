'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { SceneFallback } from './SceneFallback';

const DynamicHeroScene = dynamic(
  () => import('./HeroScene').then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

export const HeroSceneWrapper: React.FC = () => {
  return <DynamicHeroScene />;
};
