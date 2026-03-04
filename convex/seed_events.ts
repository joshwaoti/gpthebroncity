import { mutation } from "./_generated/server";
import { v } from "convex/values";

const churchEvents = [
    // January 2026
    { title: "New Year's Day", date: "2026-01-01", category: "Holiday" },
    { title: "Service Teams", date: "2026-01-04", category: "Service" },
    { title: "Church Prayer & Fasting Week", date: "2026-01-05", endDate: "2026-01-09", category: "Worship" },
    { title: "Holy Communion / Peer Groups", date: "2026-01-11", category: "Service" },
    { title: "Western Prayer Day", date: "2026-01-13", category: "Worship" },
    { title: "Medical Team Prayer & Fasting", date: "2026-01-14", endDate: "2026-01-16", category: "Worship" },
    { title: "Pastoral Team Meeting", date: "2026-01-15", category: "Leadership" },
    { title: "Leaders Meeting", date: "2026-01-17", category: "Leadership" },
    { title: "Zonal Fellowships", date: "2026-01-18", category: "Fellowship" },
    { title: "Midweek Service Relaunch", date: "2026-01-21", category: "Service" },
    { title: "Wings Prayer Retreat", date: "2026-01-24", category: "Worship" },
    { title: "SLT Graduation", date: "2026-01-25", category: "Leadership" },
    { title: "Board Meeting", date: "2026-01-29", category: "Leadership" },
    { title: "Ex-candidates Breakfast & Men's Breakfast", date: "2026-01-31", category: "Fellowship" },
    // February 2026
    { title: "Service Teams", date: "2026-02-01", category: "Service" },
    { title: "Church Prayer & Fasting Week", date: "2026-02-02", endDate: "2026-02-06", category: "Worship" },
    { title: "Overcomers Worship Experience", date: "2026-02-06", category: "Worship" },
    { title: "Intercessory Prayer Retreat & Protocol Training", date: "2026-02-07", category: "Leadership" },
    { title: "Holy Communion / Peer Groups", date: "2026-02-08", category: "Service" },
    { title: "Overcomers Valentines Dinner & Couples Dinner", date: "2026-02-13", category: "Fellowship" },
    { title: "Zonal Fellowships & New Members Orientation", date: "2026-02-15", category: "Fellowship" },
    { title: "Northern Prayer Kesha", date: "2026-02-20", category: "Worship" },
    { title: "Zonal Leadership Alignment Summit", date: "2026-02-21", category: "Leadership" },
    { title: "SLT Training, Health Checkup & New Members Orientation", date: "2026-02-22", category: "Leadership" },
    { title: "Pastoral Team Meeting", date: "2026-02-26", category: "Leadership" },
    // March 2026
    { title: "Service Teams & New Members Integration", date: "2026-03-01", category: "Service" },
    { title: "Church Prayer & Fasting Week", date: "2026-03-02", endDate: "2026-03-06", category: "Worship" },
    { title: "Care Group Bonding", date: "2026-03-07", category: "Fellowship" },
    { title: "Holy Communion / Peer Groups", date: "2026-03-08", category: "Service" },
    { title: "Upper Central Kesha", date: "2026-03-13", category: "Worship" },
    { title: "Children Facilitators' Training", date: "2026-03-14", category: "Kids" },
    { title: "Zonal Fellowships", date: "2026-03-15", category: "Fellowship" },
    { title: "Eastern Hebron City Fellowship Week", date: "2026-03-16", endDate: "2026-03-20", category: "Fellowship" },
    { title: "Eastern Missions Day", date: "2026-03-21", category: "Fellowship" },
    { title: "Eastern Sun. & SLT Training", date: "2026-03-22", category: "Leadership" },
    { title: "Pastoral Team Meeting", date: "2026-03-26", category: "Leadership" },
    { title: "Parenting Workshop", date: "2026-03-28", category: "Family" },
    { title: "Child Dedication & First Aid Training", date: "2026-03-29", category: "Service" },
    // April 2026
    { title: "Good Friday", date: "2026-04-03", category: "Holiday" },
    { title: "Easter Sunday, Service Teams, Baptism Class", date: "2026-04-05", category: "Service" },
    { title: "Easter Monday", date: "2026-04-06", category: "Holiday" },
    { title: "Church Prayer & Fasting Week", date: "2026-04-06", endDate: "2026-04-10", category: "Worship" },
    { title: "Board Meeting", date: "2026-04-09", category: "Leadership" },
    { title: "Overcomers Worship Experience", date: "2026-04-10", category: "Worship" },
    { title: "Leaders Meeting, Media Retreat, Medical Team Prayer", date: "2026-04-11", category: "Leadership" },
    { title: "Holy Communion / Peer Groups & Baptism Class", date: "2026-04-12", category: "Service" },
    { title: "Western Prayer Day", date: "2026-04-14", category: "Worship" },
    { title: "Wedding", date: "2026-04-18", category: "Family" },
    { title: "Zonal Fellowships & Baptism", date: "2026-04-19", category: "Fellowship" },
    { title: "Lower Central Hebron City Fellowship Week", date: "2026-04-20", endDate: "2026-04-24", category: "Fellowship" },
    { title: "Northern Mentorship Day", date: "2026-04-25", category: "Fellowship" },
    { title: "Lower Central Sun. & SLT Training", date: "2026-04-26", category: "Leadership" },
    { title: "Pastoral Team Meeting", date: "2026-04-30", category: "Leadership" },
    // May 2026
    { title: "Labor Day", date: "2026-05-01", category: "Holiday" },
    { title: "Intercessory Hospital Visit", date: "2026-05-02", category: "Worship" },
    { title: "Service Teams & Business Sunday", date: "2026-05-03", category: "Service" },
    { title: "Church Prayer & Fasting Week", date: "2026-05-04", endDate: "2026-05-08", category: "Worship" },
    { title: "Wings Retreat", date: "2026-05-09", category: "Fellowship" },
    { title: "Mother's Day, Holy Communion & Peer Groups", date: "2026-05-10", category: "Family" },
    { title: "Zonal Fellowships", date: "2026-05-17", category: "Fellowship" },
    { title: "Kingdom Dimensions Conference", date: "2026-05-22", endDate: "2026-05-23", category: "Service" },
    { title: "SLT Training & Church Anniversary", date: "2026-05-24", category: "Service" },
    { title: "Pastoral Team Meeting", date: "2026-05-28", category: "Leadership" },
    { title: "Children Facilitators' Retreat", date: "2026-05-30", category: "Kids" },
    // June 2026
    { title: "Madaraka Day", date: "2026-06-01", category: "Holiday" },
    { title: "Eagles Week", date: "2026-06-01", endDate: "2026-06-05", category: "Fellowship" },
    { title: "Overcomers Worship Experience", date: "2026-06-05", category: "Worship" },
    { title: "Wings & Overcomers Cookery", date: "2026-06-06", category: "Fellowship" },
    { title: "Service Teams & Eagles Sunday", date: "2026-06-07", category: "Service" },
    { title: "Church Prayer & Fasting Week", date: "2026-06-08", endDate: "2026-06-12", category: "Worship" },
    { title: "Overcomers Prayer Retreat & Zonal Leadership Workshop", date: "2026-06-13", category: "Leadership" },
    { title: "Holy Communion & Peer Groups", date: "2026-06-14", category: "Service" },
    { title: "Family Health Run organized by Eagles", date: "2026-06-20", category: "Family" },
    { title: "Father's Day, Zonal Fellowships, Child Dedication", date: "2026-06-21", category: "Family" },
    { title: "Northern Hebron City Fellowship Week", date: "2026-06-22", endDate: "2026-06-26", category: "Fellowship" },
    { title: "Pastoral Team Meeting", date: "2026-06-25", category: "Leadership" },
    { title: "Northern Sun., SLT Training, Health Checkup", date: "2026-06-28", category: "Leadership" },
    // Add rest of months up to Dec, simplifying standard events
    { title: "Board Meeting", date: "2026-07-02", category: "Leadership" },
    { title: "Leaders Meeting & Protocol Outreach", date: "2026-07-04", category: "Leadership" },
    { title: "Service Teams", date: "2026-07-05", category: "Service" },
    { title: "Church Prayer & Fasting Week", date: "2026-07-06", endDate: "2026-07-10", category: "Worship" },
    { title: "Holy Communion & Peer Groups", date: "2026-07-12", category: "Service" },
    { title: "Zonal Fellowships", date: "2026-07-19", category: "Fellowship" },
    { title: "Intercessory Prayer Retreat", date: "2026-07-24", category: "Worship" },
    { title: "Upper Central Sun. & SLT Training", date: "2026-07-26", category: "Leadership" },

    // August
    { title: "Wings Visitation", date: "2026-08-01", category: "Fellowship" },
    { title: "Service Teams & Baptism Class", date: "2026-08-02", category: "Service" },
    { title: "Church Prayer & Fasting Week", date: "2026-08-03", endDate: "2026-08-07", category: "Worship" },
    { title: "Marriage Works Forum", date: "2026-08-08", category: "Family" },
    { title: "Holy Communion & Peer Groups", date: "2026-08-09", category: "Service" },
    { title: "Men's Conference", date: "2026-08-15", category: "Fellowship" },
    { title: "Zonal Fellowships & Baptism", date: "2026-08-16", category: "Service" },
    { title: "Children's Sunday & SLT Training", date: "2026-08-23", category: "Kids" },
    { title: "Zonal Leadership Team-Building", date: "2026-08-29", category: "Leadership" },

    // December
    { title: "Church Prayer & Fasting Week", date: "2026-12-01", endDate: "2026-12-04", category: "Worship" },
    { title: "Overcomers End Year Gathering", date: "2026-12-04", category: "Fellowship" },
    { title: "Thanksgiving Sun. & Service Teams", date: "2026-12-06", category: "Service" },
    { title: "Jamhuri Day", date: "2026-12-12", category: "Holiday" },
    { title: "Teens Sunday, Holy Communion & Peer Groups", date: "2026-12-13", category: "Youth" },
    { title: "Christmas Cantata", date: "2026-12-20", category: "Service" },
    { title: "Christmas Day", date: "2026-12-25", category: "Holiday" },
    { title: "Boxing Day", date: "2026-12-26", category: "Holiday" },
];

export const importAll = mutation({
    args: {},
    handler: async (ctx) => {
        const events = await ctx.db.query("events").collect();
        if (events.length > 0) {
            console.log("Events already populated.");
            return;
        }

        let imported = 0;
        // Use a dummy user ID for createdBy if system auth isn't available
        // Need to set to an admin's ID ideally, or a string
        const createdBy = "system_import";

        for (const event of churchEvents) {
            await ctx.db.insert("events", {
                title: event.title,
                date: event.date,
                endDate: event.endDate,
                category: event.category,
                description: `Automatically imported event: ${event.title}`,
                status: "upcoming",
                createdBy: createdBy,
            });
            imported++;
        }
        return `Imported ${imported} events.`;
    }
});
