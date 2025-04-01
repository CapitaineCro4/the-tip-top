export const facebookConfig = {
  clientID: process.env.FACEBOOK_CLIENT_ID || '',
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
  profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
};
