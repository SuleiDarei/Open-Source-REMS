// src/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { users } from './db/schema';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // DB logic runs safely here in Node.js
        const userResult = await db.select().from(users).where(eq(users.email, credentials.email as string)).limit(1);
        const user = userResult[0];

        if (!user || !user.passwordHash) return null;

        const passwordsMatch = credentials.password === user.passwordHash;

        if (passwordsMatch && user.status === 'APPROVED') {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
});