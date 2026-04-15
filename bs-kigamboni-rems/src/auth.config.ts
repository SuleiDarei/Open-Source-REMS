// src/auth.config.ts
import type { NextAuthConfig, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: { id: string; role: string; } & DefaultSession['user'];
  }
  interface User { role: string; }
}

export const authConfig = {
  providers: [], 
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;