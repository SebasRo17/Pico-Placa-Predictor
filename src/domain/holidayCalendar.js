const holidays = [
    { date: '2024-01-01', name: 'New Year\'s Day' },
    { date: '2024-07-04', name: 'Independence Day' },
    { date: '2024-12-25', name: 'Christmas Day' },
    // Add more holidays as needed
];

function isHoliday(date) {
    return holidays.includes(date);
}

module.exports = {
    isHoliday
};