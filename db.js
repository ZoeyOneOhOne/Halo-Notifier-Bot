const { firebaseConfig } = require('./firebaseConfig');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, query, where, increment } = require('firebase/firestore/lite');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


async function getMaps() {
	const mapcol = collection(db, 'Maps');
	const maps = await getDocs(mapcol);
	const mapList = maps.docs.map(doc => doc.data());
	return mapList;
}

async function getGameModes() {
	const gameCol = collection(db, 'GameTypes');
	const gameModes = await getDocs(gameCol);
	const gameModeList = gameModes.docs.map(doc => doc.data());
	return gameModeList;
}

exports.getMaps = getMaps;
exports.getGameModes = getGameModes;