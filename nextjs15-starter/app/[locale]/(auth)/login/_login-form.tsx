'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type LoginProps = {
  csrf?: string;
};

const LoginButton = () => {
  const [isClick, setIsClick] = useState(false);

  return (
    <Button
      type="button"
      className={cn({
        'opacity-50': isClick,
      })}
      onClick={() => {
        setIsClick(true);
        signIn('credentials', { callbackUrl: '/en' });
      }}
    >
      Sign in
    </Button>
  );
};

const Login = (props: LoginProps) => {
  const { csrf } = props;

  return (
    <section className="h-full">
      <form className="flex flex-col gap-2 max-w-[400px] mx-auto my-auto justify-center h-full">
        <h1>Login form</h1>
        <input name="csrf" type="hidden" value={csrf} />
        <input name="username" />
        <input name="password" type="password" />
        <LoginButton />
      </form>
    </section>
  );
};

export default Login;
