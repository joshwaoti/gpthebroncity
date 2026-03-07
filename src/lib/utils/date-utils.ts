export function getNextServiceDate(): Date {
    const now = new Date();
    // Wednesday 17:30 EAT (UTC+3)
    // Sunday 09:30 EAT (UTC+3)

    const targets = [
        { day: 3, hours: 18, minutes: 0 }, // Wednesday 6:00 PM
        { day: 0, hours: 9, minutes: 30 },  // Sunday 9:30 AM
    ];

    let nextTarget = new Date(now);
    let minDiff = Infinity;

    for (const target of targets) {
        let targetDate = new Date(now);
        // Calculate days until target day
        let daysUntil = (target.day + 7 - now.getDay()) % 7;

        targetDate.setDate(now.getDate() + daysUntil);
        targetDate.setHours(target.hours, target.minutes, 0, 0);

        // If target time has passed today, move to next week
        if (targetDate <= now) {
            targetDate.setDate(targetDate.getDate() + 7);
        }

        const diff = targetDate.getTime() - now.getTime();
        if (diff < minDiff) {
            minDiff = diff;
            nextTarget = targetDate;
        }
    }

    return nextTarget;
}

export function isServiceLive(): boolean {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; // time in minutes

    // Sunday service: 9:30 AM - 12:30 PM (570 - 750 minutes)
    if (day === 0) {
        if (currentTime >= 570 && currentTime <= 780) { // 9:30 AM to 1:00 PM
            return true;
        }
    }

    // Wednesday service: 6:00 PM - 8:00 PM (1080 - 1200 minutes)
    if (day === 3) {
        if (currentTime >= 1080 && currentTime <= 1200) { // 6:00 PM to 8:00 PM
            return true;
        }
    }

    return false;
}

export function getYouTubeLiveStreamUrl(): string {
    return "https://www.youtube.com/@GPTHebronCityChurch";
}
