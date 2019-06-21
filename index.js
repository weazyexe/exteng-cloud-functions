// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateUser = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {

        const progress = change.after.get("progress");
        const level = change.after.get("level");
        const beforeProgress = change.before.get("progress");

        const date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var hour = date.getHours();
        var minutes = date.getMinutes();

        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;
        if (hour < 10) hour = "0" + hour;
        if (minutes < 10) minutes = "0" + minutes;


        let lastActivity = month + " " + day + " " + date.getFullYear() + " " + hour + ":" + minutes;

        console.log("after data: " + beforeProgress + " | " + change.before.get("level") + " | " + change.before.get("lastActivity"));
        console.log("before data: " + progress + " | " + level + " | " + lastActivity);

        if (beforeProgress != progress) {
            change.after.ref.update({
                lastActivity: lastActivity
            });
        }
    });