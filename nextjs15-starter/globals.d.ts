/* eslint-disable no-unused-vars */
import en from '@/messages/en.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

declare module 'next-auth' {
  interface Session {
    jwt: string | undefined | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
  }
}
