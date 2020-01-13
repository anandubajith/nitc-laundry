const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://l-test-5c357.firebaseio.com',
});

async function grantAdminRole(email) {
  const user = await admin.auth().getUserByEmail(email); // 1
  if (user.customClaims && user.customClaims.admin === true) {
    return;
  }
  admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  }).then(() => {
    console.log('Claim added');
  });
}

grantAdminRole('mail@anandu.net');
