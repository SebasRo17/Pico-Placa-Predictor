function isWithinPeakHours(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    const morningStart = 6 * 60; // 06:00
    const morningEnd = 9 * 60 + 30;   // 09:30

    const eveningStart = 16 * 60; // 16:00
    const eveningEnd = 20 * 60;   // 20:00

    return (
        (totalMinutes >= morningStart && totalMinutes <= morningEnd) ||
        (totalMinutes >= eveningStart && totalMinutes <= eveningEnd)
    );
}

module.exports = { 
    isWithinPeakHours
};