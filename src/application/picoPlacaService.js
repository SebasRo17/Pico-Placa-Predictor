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

    const currentMinutes = toMinutes(time);
    const peakTime = isWithinPeakHours(time);

    if (isHoliday(dateStr)) {
        return {
            canDrive: true,
            message: "It's a holiday. No restrictions apply.",
            penalty: null,
            warning: null
        };
    }

    const restrictedDigits = getRestrictedDigits(day);
    const isRestrictedDay = restrictedDigits.includes(lastDigit);

    const morningStart = 360; // 06:00
    const afternoonStart = 960; // 16:00

    let nextRestriction = null;

    if (currentMinutes < morningStart) nextRestriction = morningStart;
    else if (currentMinutes < afternoonStart) nextRestriction = afternoonStart;

    //Warnings
    let warning = null;

    if (isRestrictedDay && nextRestriction !== null) {
        const diff = nextRestriction - currentMinutes;
        if (diff <= 60) {
            warning = {
                message: `Warning: Your vehicle will be restricted in ${diff} minutes.`,
                color: "red"
            };
        }else {
            const hours = Math.floor(diff / 60);
            warning = {
                message: `Note: Your vehicle will be restricted in ${hours} hour(s), drive with caution.`,
                color: "yellow"
            };
        }
    }

    if (!isRestrictedDay) {
        const days = Object.keys(require("../domain/picoPlacaRules")).find(
            d => getRestrictedDigits(d).includes(lastDigit)
        );
        warning = {
            message: `Note: Your vehicle is restricted on ${days}.`,
            color: "green"
        };
    }

    //Final Decision
    if (!isRestrictedDay || !peakTime) {
        return {
            canDrive: true,
            message: "No Restriction applies.",
            penalty: null,
            warning
        };
    }

    
    return {
        canDrive: false,
        message: "Your vehicle is restricted by Pico y Placa regulations.",
        penalty: getPenalty(offenseCount),
        warning
    };
}

function toMinutes(time){
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
}

module.exports = {
    predict
};