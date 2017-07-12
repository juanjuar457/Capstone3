exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://juanj:12musicguy@ds155192.mlab.com:55192/otchelper';
exports.PORT = process.env.PORT || 8080;


//up with real db on mlab! credentials are live!
