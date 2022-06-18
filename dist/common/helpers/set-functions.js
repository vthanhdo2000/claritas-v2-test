"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddAndDeleteIds = exports.setDifference = exports.setIntersection = void 0;
function setIntersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}
exports.setIntersection = setIntersection;
function setDifference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}
exports.setDifference = setDifference;
function getAddAndDeleteIds(currentIds, newIds) {
    const currentIdsSet = new Set(currentIds);
    const mergedArray = [...currentIds, ...newIds];
    const newArr = [...setDifference(new Set(mergedArray), currentIdsSet)];
    const toBeDeletedArr = [...setDifference(currentIdsSet, new Set(newIds))];
    return {
        newArr,
        toBeDeletedArr,
    };
}
exports.getAddAndDeleteIds = getAddAndDeleteIds;
//# sourceMappingURL=set-functions.js.map