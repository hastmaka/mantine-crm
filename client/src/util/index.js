import {updateLocalStore, getFromLocalStore} from "./updateLocalStore.js";
import {filterUndefined} from "./filterUndefined.js";
import {formatMoney} from "./formatMoney.js";
import {findDifferences} from "./findDifference.js";
import {getDataReadyForDb} from "./getDataReadyForDb.js";
import {lastUpdate} from "./lastUpdate.js";
import {createId} from "./createId.js";
import {capitalizeFirstLetter} from "./capitalizeFirstLetter.js";

export {
	capitalizeFirstLetter,
	createId,
	lastUpdate,
	getDataReadyForDb,
	findDifferences,
	formatMoney,
	filterUndefined,
	updateLocalStore,
	getFromLocalStore
}
