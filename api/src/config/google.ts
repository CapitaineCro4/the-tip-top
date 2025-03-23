export const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL:
    process.env.NODE_ENV === 'production'
      ? 'https://dsp5-archi-f24a-15m-g4.fr/api/auth/google/callback'
      : 'http://localhost:3002/auth/google/callback',
};
