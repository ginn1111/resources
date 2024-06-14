import { getCsrfToken } from 'next-auth/react';
import Login from './_login-form';

const LoginPage = async () => {
  const csrf = await getCsrfToken();

  return <Login csrf={csrf} />;
};

export default LoginPage;
