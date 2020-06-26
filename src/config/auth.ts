export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expirestIn: '1d',
  },
};
