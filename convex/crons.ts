import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Tuesday at 5 PM local (14:00 UTC)
crons.weekly(
    "sync-youtube-sermons-tuesday",
    { dayOfWeek: "tuesday", hourUTC: 14, minuteUTC: 0 },
    api.youtube.syncSermons,
);

// Friday at 5 PM local (14:00 UTC)
crons.weekly(
    "sync-youtube-sermons-friday",
    { dayOfWeek: "friday", hourUTC: 14, minuteUTC: 0 },
    api.youtube.syncSermons,
);

// Daily at midnight UTC: auto-mark past events as "completed"
crons.daily(
    "mark-past-events-completed",
    { hourUTC: 0, minuteUTC: 0 },
    api.events.markPastEventsCompleted,
);

export default crons;
