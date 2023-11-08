function countBy(array) {
    return array.reduce((acc, item) => {
        if (acc[item]) {
            acc[item] += 1;
        }
        else {
            acc[item] = 1;
        }
        return acc;
    }, {});
}
export default countBy;
//# sourceMappingURL=countBy.js.map