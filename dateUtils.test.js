import { calculateRevisionDates } from './dateUtils.js';

describe('Spaced Repetition Date Calculator', () => {
    test('should accurately calculate the 5 required spacing intervals', () => {
        const baseDate = '2026-07-19';
        const result = calculateRevisionDates(baseDate);

        expect(result).toHaveLength(5);

        expect(result[0].getDate()).toBe(26);
        expect(result[0].getMonth()).toBe(6); 
        expect(result[0].getFullYear()).toBe(2026);

        expect(result[1].getDate()).toBe(19);
        expect(result[1].getMonth()).toBe(7); 

        expect(result[2].getMonth()).toBe(9); 

        expect(result[3].getFullYear()).toBe(2027);
        expect(result[3].getMonth()).toBe(0); 

        expect(result[4].getFullYear()).toBe(2027);
        expect(result[4].getMonth()).toBe(6); 
    });
});