import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials as any, req) {
        return credentials;
        // const { name, email, password, image } = credentials;
        // const { data } = await axios.post(
        //   'http://localhost:3000/api/signuser/hello',
        //   {
        //     name,
        //     email,
        //     password,
        //     image,
        //   }
        // );
        // if (data) {
        //   return data;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const { data } = await axios.post(
        'http://localhost:3000/api/signuser/hello',
        {
          name: token.name,
          email: token.email,
          image: token.picture,
        }
      );
      if (data) {
        token.id = data._id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },

  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
