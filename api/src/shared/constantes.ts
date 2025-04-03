export const GOOGLE_CALLBACK_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

export const FACEBOOK_CALLBACK_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook/callback`;
export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || '';
export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || '';

export const CALLBACK_FRONTEND_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/callback`;
export const LOGIN_FRONTEND_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`;
