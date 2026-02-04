const rules = {
    monday:    [1, 2],
    tuesday:   [3, 4],
    wednesday: [5, 6],
    thursday:  [7, 8],
    friday:    [9, 0],
    saturday:  [],
    sunday:    []
}

function getRestrictedDigits(dayOfWeek) {
    return rules[dayOfWeek] || [];
}

function getAllRules() {
    return rules;
}

module.exports = {
    getRestrictedDigits,
    getAllRules
};