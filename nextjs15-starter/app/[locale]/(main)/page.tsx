'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function Home() {
  const t = useTranslations('Home');
  const [state, setState] = useState(0);

  return (
    <>
      <p>{t('home')}</p>
      <p>{state}</p>
      <Button onClick={() => setState(Math.random())}>Click me</Button>
      <Button onClick={() => signIn()}>Sign In</Button>
    </>
  );
}
