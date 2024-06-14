'use client';

import { Session } from 'next-auth';
import { SessionProvider as SessionProviderBase } from 'next-auth/react';
import * as React from 'react';

const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProviderBase session={session}>{children}</SessionProviderBase>
  );
};

export default SessionProvider;
