import { makeAutoObservable } from 'mobx';

export default class InterimStore {
  constructor() {
    this._searchVar = [];
    this._highStr = [];
    makeAutoObservable(this);
  }
  setSearchVar(data) {
    this._searchVar = data;
  }
  setHighStr(data) {
    this._highStr = data;
  }
  get searchVar() {
    return this._searchVar;
  }
  get highStr() {
    return this._highStr;
  }
}

// const filterData = item => {
// 	if (!searchValue) return;
// 	let isNotFound = false;

// 	let result = -1;

// 	const indexArray = Array.from(searchValue).map(i => {
// 		result = item.name.toLowerCase().indexOf(i.toLowerCase(), result + 1);
// 		if (result === -1) {
// 			isNotFound = true;
// 		}
// 		return result;
// 	});
// 	if (isNotFound) return;

// 	const lastData = getLocalhost('searchVar');
// 	const currentData = [[[...indexArray], item.id]];

// 	if (!lastData) {
// 		setLocalhost('searchVar', currentData);
// 	} else if (!lastData.find(i => i.at(-1) === item.id)) {
// 		setLocalhost('searchVar', lastData.concat(currentData));
// 	}

// 	return true;
// };

// function highlightChars(str, indexes) {
// 	let arr = [];
// 	let pos = 0;
// 	indexes.forEach(i => {
// 		if (i === pos) {
// 			if (i !== 0) {
// 				const lastObj = arr.at(-1);
// 				const lastInd = lastObj.ind;

// 				arr = arr.slice(0, -1).concat({
// 					...lastObj,
// 					sub: lastObj.sub + str[i],
// 					ind: [lastInd[0], i],
// 					maxLength: lastObj.maxLength + 1,
// 				});
// 			} else {
// 				arr = [...arr, { sub: str[i], isHighlight: true, ind: [i], maxLength: 1, str }];
// 			}
// 		} else {
// 			arr = [
// 				...arr,
// 				{
// 					sub: str.slice(pos, i),
// 					isHighlight: false,
// 					ind: i === pos + 1 ? [pos] : [pos, i - 1],
// 					str,
// 				},
// 				{ sub: str[i], isHighlight: true, ind: [i], maxLength: 1, str },
// 			];
// 		}
// 		pos = i + 1;
// 	});
// 	if (str.length - 1 !== indexes.at(-1)) {
// 		arr = [...arr, { sub: str.slice(pos), isHighlight: false, ind: [pos, str.length - 1], str }];
// 	}

// 	const lastData = getLocalhost('highlightedStrings');
// 	const currentData = [arr];

// 	if (!lastData) {
// 		setLocalhost('highlightedStrings', currentData);
// 	} else if (!lastData.find(i => i[0].str === currentData[0][0].str)) {
// 		setLocalhost('highlightedStrings', lastData.concat(currentData));
// 	}
// 	return arr;
// }
