import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  secret: 'RMd6teQG2PWKi0md+N872Arml1APhQtUGwqoZRAe0Q0=',
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          placeholder: 'Please enter username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Please enter password',
        },
      },
      authorize: () => {
        return {
          name: 'Gin111',
          id: '123',
        };
      },
    }),
  ],
  callbacks: {
    signIn(params) {
      console.log('call in signin cb');
      console.log(params);
      return true;
    },
    jwt(params) {
      console.log('call in jwt cb');
      console.log(params);
      return params.token;
    },
    session(params) {
      console.log('call in session cb');
      console.log(params);

      return params.session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default authOptions;
