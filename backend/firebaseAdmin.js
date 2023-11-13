const admin = require('firebase-admin');

const serviceAccount = require('./admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function verifyToken(token) {
    const user = await admin
      .auth()
      .verifyIdToken(token)
      .then(decoded => decoded)
      .catch(() => {
        return null;
      });
    
    return user;
  }
  
  module.exports = verifyToken;