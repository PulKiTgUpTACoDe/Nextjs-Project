import type { NextAuthConfig } from 'next-auth';
import facebook from 'next-auth/providers/facebook';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import twitter from 'next-auth/providers/twitter';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [github,google,facebook,twitter], 
} satisfies NextAuthConfig;