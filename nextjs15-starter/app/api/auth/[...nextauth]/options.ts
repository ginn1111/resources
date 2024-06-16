import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
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
    jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.id = new Date().getTime();
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        // eslint-disable-next-line no-param-reassign
        session.jwt = token.id.toString();
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default authOptions;
