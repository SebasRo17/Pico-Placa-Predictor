const { getRestrictedDigits } = require("../domain/picoPlacaRules");
const { isWithinPeakHours } = require("../domain/peakHours");
const { isHoliday } = require("../domain/holidayCalendar");
const { getPenalty } = require("../domain/penaltyPolicy");

function predict(plateNumber, dateStr, time, offenseCount = 0) {
    const numericPart = plateNumber.replace(/\D/g, '');
    const lastDigit = parseInt(numericPart.slice(-1));

    const date = new Date(dateStr);
    const day = date
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase();

    if (isHoliday(dateStr)) {
        return {
            canDrive: true,
            message: "It's a holiday. No restrictions apply.",
            penalty: null
        };
    }

    if (!isWithinPeakHours(time)) {
        return {
            canDrive: true,
            message: "Outside peak hours. You can drive.",
            penalty: null
        };
    }

    const restrictedDigits = getRestrictedDigits(day);

    if (!restrictedDigits.includes(lastDigit)) {
        return {
            canDrive: true,
            message: "Your vehicle is not restricted at this time.",
            penalty: null
        };
    } 
    
    return {
        canDrive: false,
        message: "Your vehicle is restricted by Pico y Placa regulations.",
        penalty: getPenalty(offenseCount)
    };
}

module.exports = {
    predict
};