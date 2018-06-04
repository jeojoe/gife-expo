import * as firebase from 'firebase';
import Config from '../../app.json';

firebase.initializeApp(Config.firebase);

export default firebase;
