function getPenalty(offenseCount) {
    if (offenseCount === 1) return "15% SBU";
    if (offenseCount === 2) return "30% SBU";
    if (offenseCount >= 3) return "50% SBU";
    return null;
}

module.exports = {
    getPenalty
};