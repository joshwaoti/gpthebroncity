export interface EventData {
    id: string
    title: string
    date: Date
    endTime?: string
    location: string
    category: string
    slug: string
    featured: boolean
    image: string
    description: string
    details: string[]
    organizer: string
    contact?: string
    registrationLink?: string
}

export const ALL_EVENTS: EventData[] = [
    {
        id: "1",
        title: "Sunday Service: The Power of Faith",
        date: new Date(2026, 1, 22),
        endTime: "1:00 PM",
        location: "Main Sanctuary, Utawala",
        category: "Service",
        slug: "sunday-service-faith",
        featured: true,
        image: "/assets/img/events.jpg",
        description:
            "Join us for a powerful Sunday service as Pastor Albert Shitakwa delivers a message on the transformative power of faith. This service is part of the ongoing 'Unshakeable Faith' series drawn from the book of Hebrews.",
        details: [
            "Main worship service with the Hebron City Worship Team",
            "Children's church available for ages 3-12",
            "Free parking available on campus",
            "Communion will be served during this service",
            "New visitors welcome — join us for refreshments after service",
        ],
        organizer: "GPT Hebron City Pastoral Team",
        contact: "info@gpthebroncity.org",
    },
    {
        id: "2",
        title: "Men's Breakfast Fellowship",
        date: new Date(2026, 1, 28),
        endTime: "11:00 AM",
        location: "Hebron City Hall",
        category: "Fellowship",
        slug: "mens-breakfast",
        featured: false,
        image: "/assets/img/events.jpg",
        description:
            "A morning of brotherhood, prayer, and breakfast. Men of Valor gather to strengthen one another in faith, purpose, and leadership. Guest speaker: Elder James Mwangi on 'Leading with Integrity.'",
        details: [
            "Full breakfast buffet included with entry",
            "Guest speaker: Elder James Mwangi",
            "Topic: 'Leading with Integrity in Your Household'",
            "Open discussion and prayer session",
            "Open to all men aged 18+",
        ],
        organizer: "Men of Valor Ministry",
        contact: "men@gpthebroncity.org",
    },
    {
        id: "3",
        title: "Worship Night: Encounter",
        date: new Date(2026, 2, 6),
        endTime: "10:00 PM",
        location: "Main Sanctuary",
        category: "Worship",
        slug: "worship-night",
        featured: false,
        image: "/assets/img/events.jpg",
        description:
            "An evening dedicated entirely to worship and encountering the presence of God. The Hebron City Worship Team leads an extended worship session — no sermon, just spirit-filled music and prayer.",
        details: [
            "2 hours of uninterrupted worship and praise",
            "Led by the Hebron City Worship Team",
            "Prayer stations will be available",
            "Open to all ages and denominations",
            "Bring your instruments if you'd like to join the team",
        ],
        organizer: "Worship Department",
        contact: "worship@gpthebroncity.org",
    },
    {
        id: "4",
        title: "Children's Church Fun Day",
        date: new Date(2026, 2, 14),
        endTime: "4:00 PM",
        location: "Children's Block",
        category: "Kids",
        slug: "kids-fun-day",
        featured: false,
        image: "/assets/img/events.jpg",
        description:
            "A fun-filled day of games, crafts, music, and Bible stories for children ages 3-12. Let your kids experience the joy of faith in a safe, engaging environment.",
        details: [
            "Face painting, bouncy castles, and outdoor games",
            "Interactive Bible story sessions",
            "Arts and crafts workshop",
            "Healthy snacks and juice provided",
            "Parents can drop off or stay and enjoy",
        ],
        organizer: "Kingdom Kids Ministry",
        contact: "kids@gpthebroncity.org",
    },
    {
        id: "5",
        title: "Leadership Summit 2026",
        date: new Date(2026, 2, 20),
        endTime: "5:00 PM",
        location: "Conference Center",
        category: "Leadership",
        slug: "leadership-summit",
        featured: false,
        image: "/assets/img/events.jpg",
        description:
            "A full-day leadership training and development summit for church leaders, ministry heads, and emerging leaders. Equipping the next generation to lead with excellence and spiritual authority.",
        details: [
            "Keynote address by Bishop Stanley Mwalili",
            "Breakout sessions on ministry leadership, team building, and vision casting",
            "Networking lunch included",
            "Certificate of attendance provided",
            "Pre-registration required — limited to 200 attendees",
        ],
        organizer: "Church Leadership Office",
        contact: "leadership@gpthebroncity.org",
        registrationLink: "/connect",
    },
]

export const EVENT_CATEGORIES = ["Service", "Fellowship", "Worship", "Kids", "Leadership"]

export function getEventBySlug(slug: string): EventData | undefined {
    return ALL_EVENTS.find((event) => event.slug === slug)
}

export function getUpcomingEvents(excludeSlug?: string, limit = 3): EventData[] {
    const now = new Date()
    return ALL_EVENTS
        .filter((event) => event.date >= now && event.slug !== excludeSlug)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, limit)
}
