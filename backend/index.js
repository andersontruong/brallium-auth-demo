require('./mongodb');
const verifyToken = require('./firebaseAdmin');
const UserModel = require('./UserModel');

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Express server started on ${PORT}.`);
});

/**
 * Every request needs to be authenticated/authorized depending on resource
 * 
 * Need a verification function to be called to accept/deny the request
 * 
 * Two choices for user creation:
 * 1. Only create user through Sign Up
 *     - Need special handling if User decides to navigate before their MongoDB user doc is created
 * 2. Create a new user during verification if no user exists with that email
 *     - Always makes sure a Firebase Auth User is paired with a MongoDB user document
 */

/**
 * Verifies an Express request.
 * 1. Authenticates Firebase user with JWT Authorization String and Firebase Admin
 * 2. Verifies request body
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {mongoose.Model} Model Mongoose Model Schema
 * @param {Array} nonRepeatedFields Array of field names not to be repeated
 * @returns An `Array` of `[ user, doc ]`
 */
async function verifyRequest (req, res) {
    console.log('verify request')
    let auth = req.headers.authorization;
    if (!auth) {
        res.status(401);
        res.send('Unauthorized: no token');
        return false;
    }
    if (auth.length < 3) {
        res.status(401);
        res.send('Unauthorized: invalid token');
        return false;
    }
    const token = auth.split(' ')[1]
    const user = await verifyToken(token);
    console.log(user);

    if (!user) {
        res.status(401);
        res.send('Unauthorized: invalid user');
        return false;
    }
    
    // Create a new user if does not exist
    let existingUser = await UserModel.findOne({ firebaseId: user.uid });
    if (!existingUser) {
        const newUser = new UserModel({
        firebaseId: user.uid,
        email: user.email
        });

        existingUser = await newUser.save();
    }

    return existingUser;
}

app.get('/userPurchases', async (req, res) => {
    const user = await verifyRequest(req, res);
    if (!user) {
        console.log('Invalid user');
        res.status(401);
        return;
    }

    // MongoDB find all PurchaseObjects with user.uid
    // return PurchaseObjects
});

app.get('/getUser', async (req, res) => {
    const user = await verifyRequest(req, res);
    if (!user) {
        console.log('Invalid user');
        res.status(401);
        return;
    }

    console.log('Found user');

    var userData = { ...user._doc };
    delete userData._id;
    delete userData.firebaseId;
    delete userData.__v;

    res.status(200);
    res.send(userData);
});