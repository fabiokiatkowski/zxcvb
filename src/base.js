import Rebase from 're-base';
import Firebase from 'firebase';

const app = Firebase.initializeApp({
    apiKey: "AIzaSyCoJ-wa3KOAnzX_FGwievfrIRzs_TZKrtA",
    authDomain: "planeleanor.firebaseapp.com",
    databaseURL: "https://planeleanor.firebaseio.com",
    storageBucket: "planeleanor.appspot.com",
    messagingSenderId: "135030489142"
});
const base = Rebase.createClass(app.database());

export default base;

