export const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL:
    process.env.NODE_ENV === 'production'
      ? 'https://votre-domaine.com/api/auth/google/callback'
      : 'http://localhost:3002/api/auth/google/callback',
};
