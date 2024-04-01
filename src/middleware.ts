import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/site', '/api/auth/send-otp'],
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
