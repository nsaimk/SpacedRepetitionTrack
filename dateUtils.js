/**
 * Calculates revision intervals from a starting date string (YYYY-MM-DD).
 * Returns an array of UTC Date objects.
 */
export function calculateRevisionDates(startDateString) {
    // Parse the date safely as a local date baseline, but strip time artifacts
    const baseDate = new Date(startDateString);

    const intervals = [
        { type: 'days', value: 7 },    // 1 week
        { type: 'months', value: 1 },  // 1 month
        { type: 'months', value: 3 },  // 3 months
        { type: 'months', value: 6 },  // 6 months
        { type: 'months', value: 12 }  // 1 year
    ];

    return intervals.map(interval => {
        const newDate = new Date(baseDate.getTime());

        if (interval.type === 'days') {
            newDate.setDate(newDate.getDate() + interval.value);
        } else if (interval.type === 'months') {
            newDate.setMonth(newDate.getMonth() + interval.value);
        }

        // Reset time to absolute midnight to prevent DST hours from shifting the day
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    });
}

/**
 * Validates if a target date is in the future or is exactly today (ignoring hours/minutes)
 */
export function isFutureOrToday(dateToCheck) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(dateToCheck);
    target.setHours(0, 0, 0, 0);

    return target >= today;
}