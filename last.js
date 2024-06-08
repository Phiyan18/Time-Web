function calculateElapsedTime(startDate) {
    const currentDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const elapsedMilliseconds = currentDate - startDate;

    // Convert elapsed milliseconds to seconds, minutes, hours, days, months, and years
    let elapsedSeconds = elapsedMilliseconds / 1000;
    let elapsedMinutes = elapsedSeconds / 60;
    let elapsedHours = elapsedMinutes / 60;
    let elapsedDays = elapsedHours / 24;
    let elapsedMonths = elapsedDays / 30.4375; // Average number of days in a month
    let elapsedYears = elapsedMonths / 12;

    // Calculate remaining time after removing elapsed years, months, days, hours, and minutes
    const remainingMilliseconds = elapsedMilliseconds % 1000;
    const remainingSeconds = Math.floor(elapsedSeconds % 60);
    const remainingMinutes = Math.floor(elapsedMinutes % 60);
    const remainingHours = Math.floor(elapsedHours % 24);
    const remainingDays = Math.floor(elapsedDays % 30.4375) - 1;
    const remainingMonths = Math.floor(elapsedMonths % 12);

    return {
        years: Math.floor(elapsedYears),
        months: remainingMonths,
        days: remainingDays,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
        milliseconds: remainingMilliseconds
    };
}

function updateCountdown(newStartDate) {
    const startDate = newStartDate ? new Date(newStartDate) : defaultStartDate;
    const elapsedTime = calculateElapsedTime(startDate);

    // Display the elapsed time
    const elapsedTimeString = `${elapsedTime.years} y. ${elapsedTime.months} m. ${elapsedTime.days} d. ${elapsedTime.hours} h. ${elapsedTime.minutes} min. ${elapsedTime.seconds} s. ${elapsedTime.milliseconds} ms`;

    document.getElementById('countdown').textContent = elapsedTimeString;
}

function updateCountdownFromInput() {
    const startDateInput = document.getElementById('startDateInput').value;
    defaultStartDate = new Date(startDateInput);

    // Save the new default start date to local storage
    localStorage.setItem('defaultStartDate', defaultStartDate);

    updateCountdown(startDateInput);
}

// If there is a saved start date in local storage, set it as the default start date
const savedStartDate = localStorage.getItem('defaultStartDate');
if (savedStartDate) {
    defaultStartDate = new Date(savedStartDate);
}

// Initial countdown update
updateCountdown();

// Update the countdown every second
setInterval(updateCountdown, 1);
