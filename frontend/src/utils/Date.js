// Function to get the current date (day, month, year, and full day name)

function currentDate() {
    const currentClock = new Date(); // Get the current date and time
    const currentDate = currentClock.getDate(); // Extract current date
    const currentYear = currentClock.getFullYear(); // Extract current year
    const currentMonth = currentClock.toDateString().slice(4, 7); // Extract the abbreviated month name
    const currentDay = currentClock.toDateString().slice(0, 3); // Extract the abbreviated day name
    let currentFullDay;

    // Switch case to determine the full name of the day (Monday to Sunday)
    switch (currentClock.getDay()) {
        case 1:
            currentFullDay = "Monday";
            break;
        case 2:
            currentFullDay = "Tuesday";
            break;
        case 3:
            currentFullDay = "Wednesday";
            break;
        case 4:
            currentFullDay = "Thursday";
            break;
        case 5:
            currentFullDay = "Friday";
            break;
        case 6:
            currentFullDay = "Saturday";
            break;
        default:
            currentFullDay = "Sunday"; // Default case for Sunday
    };

    // Return an object containing date, month, year, abbreviated day, and full day name
    return {
        date: currentDate,
        month: currentMonth,
        year: currentYear,
        day: currentDay,
        fullDay: currentFullDay
    };
};

export { currentDate };