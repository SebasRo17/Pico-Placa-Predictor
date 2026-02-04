const { predict } = require('../src/application/picoPlacaService');

describe('Pico y Placa Prediction Service', () => {

    test("Should block car on restricted day during peak hours", () => {
        const result = predict("PDN-3635", "2026-02-04", "17:30", 0); //Wednesday, last digit 5

        expect(result.canDrive).toBe(false);
    });

    test("Should allow car outside peak hours even on restricted day", () => {
        const result = predict("PDN-3635", "2026-02-04", "12:00", 0);

        expect(result.canDrive).toBe(true);
    });

    test("Should allow car on non-restricted day", () => {
        const result = predict("PDN-3635", "2026-02-03", "17:30", 0); // Tuesday

        expect(result.canDrive).toBe(true);
        expect(result.warning.color).toBe("green");
    });

    test("Should show red warning when restriction is within 60 minutes", () => {
        const result = predict("PDN-3635", "2026-02-04", "15:30", 0);

        expect(result.warning.color).toBe("red");
    });

    test("Should show yellow warning when restriction is more than 1 hour away", () => {
        const result = predict("PDN-3635", "2026-02-04", "13:00", 0);

        expect(result.warning.color).toBe("orange");
    });

    test("Should allow car on holidays", () => {
        const result = predict("PDN-3635", "2026-01-01", "08:00", 0);

        expect(result.canDrive).toBe(true);
    });

});