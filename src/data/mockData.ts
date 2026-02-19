export const homeData = {
    hero: {
        badge: "2026 THEME",
        title: {
            line1: "Christ Revealed,",
            line2: "Christ Expressed",
        },
        subtitle: "Raising Kingdom Ambassadors",
        description: "\"Christ in you, the hope of glory\" — Colossians 1:27",
        cta: {
            primary: "Plan Your Visit",
            secondary: "Watch Sermons",
        },
        bgImage: "/assets/img/bg-4-2026.jpg",
    },
    serviceTimes: {
        nextService: "2026-02-25T08:30:00", // Placeholder date
        label: "Next Service",
    },
    projects: {
        title: "Building the Next Gen Church",
        subtitle: "Our Projects",
        linkText: "View All Projects",
        items: [
            {
                id: 1,
                title: "Children's Church Block",
                description: "Creating a safe, engaging, and spiritually nourishing space for our children to grow in faith.",
                image: "/assets/img/construct.jpg",
                progress: {
                    current: 120500,
                    goal: 250000,
                },
                priority: true,
            },
            {
                id: 2,
                title: "Parking Expansion",
                description: "Expanding accessibility and convenience for our growing community with 200+ new slots.",
                image: "/assets/img/construct.jpg",
                progress: {
                    current: 45000,
                    goal: 80000,
                },
            },
            {
                id: 3,
                title: "Community Hall",
                description: "A multipurpose venue for weddings, conferences, and youth events.",
                image: "/assets/img/construct.jpg",
                progress: {
                    current: 10000,
                    goal: 150000,
                },
            },
        ],
    },
    latestSermon: {
        badge: "Latest Series",
        title: "Unshakeable Faith",
        description: "In a world of constant change, discover the foundation that never moves. Join us as we explore the book of Hebrews and uncover the power of a faith that endures.",
        thumbnail: "/assets/img/christreveaaled.png",
        actions: {
            watch: "Watch Sermon",
            listen: "Listen to Audio",
        },
    },
    visit: {
        title: "Plan Your Visit",
        bgImage: "/assets/img/misc/bg-subheader.jpg",
        campus: {
            name: "Hebron City Campus",
            address: "Eastern Bypass, Utawala, Nairobi, Kenya",
        },
        times: {
            sunday: "8:30 AM & 11:00 AM",
            wednesday: "6:00 PM",
        },
        action: "Get Directions",
    },
}

export const beliefsData = [
    {
        id: "scriptures",
        title: "The Scriptures",
        content: "The Bible is the inspired Word of God, the product of holy men of old who spoke and wrote as they were moved by the Holy Spirit. The New Covenant, as recorded in the New Testament, we accept as our infallible guide in matters pertaining to conduct and doctrine.",
        scriptures: ["2 Timothy 3:16", "1 Thessalonians 2:13", "2 Peter 1:21"]
    },
    {
        id: "godhead",
        title: "The Godhead",
        content: "Our God is one, but manifested in three persons – the Father, the Son, and the Holy Spirit, being co-equal.",
        scriptures: ["Philippians 2:6", "Matthew 3:16-17"]
    },
    {
        id: "man",
        title: "Man, His Fall and Redemption",
        content: "Man is a created being, made in the likeness and image of God, but through Adam's transgression and fall, sin came into the world... Jesus Christ, the Son of God, was manifested to undo the works of the devil and gave His life and shed His blood to redeem and restore man back to God.",
        scriptures: ["Romans 5:14", "Romans 3:10", "Romans 3:23", "1 John 3:8"]
    },
    {
        id: "salvation",
        title: "Eternal Life and the New Birth",
        content: "Man's first step toward salvation is godly sorrow that worketh repentance. The New Birth is necessary to all men, and when experienced produces eternal life.",
        scriptures: ["2 Corinthians 7:10", "1 John 5:12", "John 3:3-5"]
    },
    {
        id: "baptism",
        title: "Water Baptism",
        content: "Baptism in water is by immersion, is a direct commandment of our Lord, and is for believers only. The ordinance is a symbol of the Christian's identification with Christ in His death, burial, and resurrection.",
        scriptures: ["Matthew 28:19", "Romans 6:4", "Colossians 2:12", "Acts 8:36-39"]
    },
    {
        id: "holy-spirit",
        title: "Baptism in the Holy Ghost",
        content: "The Baptism in the Holy Ghost and Fire is a gift from God as promised by the Lord Jesus Christ to all believers in this dispensation and is received subsequent to the New Birth.",
        scriptures: ["Matthew 3:11", "John 14:16-17", "Acts 1:8", "Acts 2:38-39"]
    }
]

export const mediaData = {
    hero: {
        badge: "Featured Series",
        title: "The Book of Hebrews",
        description: "Join us as we explore the supremacy of Christ in our latest series through the book of Hebrews.",
        cta: "Watch Series",
        bgImage: "/assets/img/christreveaaled.png"
    },
    items: [
        {
            id: 1,
            title: "Jesus, Greater Than Angels",
            preacher: "Rev. Dr. G.K. Mburu",
            series: "The Book of Hebrews",
            date: "Feb 18, 2026",
            thumbnail: "/assets/img/christreveaaled.png",
            category: "Sermons",
            duration: "45:20"
        },
        {
            id: 2,
            title: "Drifting Away",
            preacher: "Rev. Dr. G.K. Mburu",
            series: "The Book of Hebrews",
            date: "Feb 11, 2026",
            thumbnail: "/assets/img/christreveaaled.png",
            category: "Sermons",
            duration: "52:10"
        },
        {
            id: 3,
            title: "Sunday Worship Experience",
            preacher: "Worship Team",
            series: "Sunday Service",
            date: "Feb 18, 2026",
            thumbnail: "/assets/img/projects/worship.jpg",
            category: "Worship",
            duration: "25:00"
        },
        {
            id: 4,
            title: "Faith That Endures",
            preacher: "Rev. Dr. G.K. Mburu",
            series: "Unshakeable Faith",
            date: "Feb 04, 2026",
            thumbnail: "/assets/img/christreveaaled.png",
            category: "Sermons",
            duration: "48:15"
        },
        {
            id: 5,
            title: "Vision 2026 Documentation",
            preacher: "Media Team",
            series: "Special Features",
            date: "Jan 25, 2026",
            thumbnail: "/assets/img/bg_full_1.jpg",
            category: "Special",
            duration: "10:30"
        }
    ]
}

export const projectsPage = {
    hero: {
        title: "Building the Next Gen Church",
        subtitle: "Vision 2026",
        description: "We are building a legacy for future generations. Join us as we expand our territory and create spaces for worship, fellowship, and discipleship.",
        bgImage: "/assets/img/bg_full_1.jpg",
        stats: [
            { label: "Total Goal", value: "$500,000" },
            { label: "Raised So Far", value: "$175,500" },
            { label: "Completion", value: "35%" }
        ]
    },
    cta: {
        title: "Partner With Us",
        description: "Your generosity clears the way for the Gospel. Every seed sown is a brick in the wall of this great work.",
        buttonText: "Give Now"
    }
}

export const givingPage = {
    hero: {
        title: "Worship Through Giving",
        subtitle: "Tithes & Offerings",
        description: "Your generosity empowers the church to preach the gospel, disciple believers, and serve our community. Thank you for your faithfulness.",
        bgImage: "/assets/img/bg_full_1.jpg"
    },
    methods: [
        {
            id: "mpesa",
            title: "M-Pesa",
            type: "mobile",
            description: "Fast and secure mobile money transfer.",
            details: [
                { label: "Paybill Number", value: "247247" },
                { label: "Account Number", value: "123456" }
            ]
        },
        {
            id: "bank",
            title: "Bank Transfer",
            type: "bank",
            description: "Direct bank deposit or transfer.",
            details: [
                { label: "Bank Name", value: "Equity Bank" },
                { label: "Branch", value: "Utawala" },
                { label: "Account Name", value: "GPT Hebron City" },
                { label: "Account Number", value: "0123456789012" }
            ]
        },
        {
            id: "pesalink",
            title: "PesaLink",
            type: "online",
            description: "Instant inter-bank transfer.",
            details: [
                { label: "Bank", value: "Equity Bank" },
                { label: "Phone Linked", value: "0712 345 678" }
            ]
        },
        {
            id: "sendwave",
            title: "Sendwave",
            type: "international",
            description: "For international giving.",
            details: [
                { label: "Recipient", value: "GPT Hebron City" },
                { label: "Phone Number", value: "+254 712 345 678" }
            ]
        }
    ]
}

export const connectPage = {
    hero: {
        title: "Connect With Us",
        subtitle: "Join the Family",
        description: "Life is better together. Whether you have a prayer request, a testimony, or just want to say hello, we'd love to hear from you.",
        bgImage: "/assets/img/misc/bg-subheader.jpg" // Using a generic bg or reuse one
    },
    socials: [
        { platform: "YouTube", handle: "@GPTHebronCity", link: "https://youtube.com/@GPTHebronCity", followers: "5k+" },
        { platform: "Facebook", handle: "GPT Hebron City", link: "https://facebook.com/GPTHebronCity", followers: "12k+" },
        { platform: "Instagram", handle: "@gpthebroncity", link: "https://instagram.com/gpthebroncity", followers: "8k+" },
        { platform: "TikTok", handle: "@gpthebroncity", link: "https://tiktok.com/@gpthebroncity", followers: "15k+" }
    ],
    contactInfo: {
        phone: "+254 712 345 678",
        email: "info@gpthebroncity.org",
        address: "Eastern Bypass, Utawala, Nairobi"
    }
}

export const visitPage = {
    hero: {
        title: "Welcome Home",
        subtitle: "Plan Your Visit",
        description: "We can't wait to host you! Whether you're visiting for the first time or returning, we have a seat saved just for you.",
        bgImage: "/assets/img/bg_full_1.jpg"
    },
    services: [
        { day: "Sunday", time: "8:30 AM", label: "First Service" },
        { day: "Sunday", time: "11:00 AM", label: "Second Service" },
        { day: "Wednesday", time: "6:00 PM", label: "Midweek Service" }
    ],
    location: {
        address: "Eastern Bypass, Utawala, Nairobi, Kenya",
        mapLink: "https://maps.google.com/?q=GPT+Hebron+City"
    },
    faqs: [
        {
            question: "What should I wear?",
            answer: "Come as you are! You'll see everything from suits to jeans. We care more about you than what you wear."
        },
        {
            question: "Is there something for my kids?",
            answer: "Absolutely! We have a dedicated Children's Church with age-appropriate teaching and fun activities."
        },
        {
            question: "Where do I park?",
            answer: "We have ample secure parking within the church compound, with attendants to guide you."
        },
        {
            question: "How long is the service?",
            answer: "Our services typically last about 2 hours, filled with vibrant worship and the Word."
        }
    ]
}

export const ministriesPage = {
    hero: {
        title: "Serve & Belong",
        subtitle: "Find Your Place",
        description: "We believe every believer is a minister. Discover where you can serve, grow, and build meaningful relationships within the GPT Hebron City family.",
        bgImage: "/assets/img/bg_full_1.jpg"
    },
    items: [
        {
            id: "kids",
            title: "Kingdom Kids",
            description: "A fun, safe, and faith-filled environment for children to learn about Jesus.",
            image: "/assets/img/citycenter.jpg",
            schedule: "Sundays 8:30 AM & 11:00 AM",
            leader: "Pst. Alice"
        },
        {
            id: "teens",
            title: "NextGen Teens",
            description: "Empowering teenagers to live bold, authentic lives for Christ in their generation.",
            image: "/assets/img/citycenter.jpg",
            schedule: "Sundays 10:30 AM",
            leader: "Bro. John"
        },
        {
            id: "men",
            title: "Men of Valor",
            description: "Men sharpening men to be the leaders, fathers, and husbands God called them to be.",
            image: "/assets/img/citycenter.jpg",
            schedule: "Monthly Fellowships",
            leader: "Elder James"
        },
        {
            id: "women",
            title: "Daughters of Zion",
            description: "Women supporting each other in prayer, fellowship, and spiritual growth.",
            image: "/assets/img/citycenter.jpg",
            schedule: "Monthly Fellowships",
            leader: "Rev. Sarah"
        },
        {
            id: "worship",
            title: "Worship Team",
            description: "Leading the congregation in spirit and truth through music and song.",
            image: "/assets/img/events.jpg",
            schedule: "Practice: Saturdays 2:00 PM",
            leader: "Music Director"
        },
        {
            id: "media",
            title: "Media & Tech",
            description: "Using technology to broadcast the Gospel to the world with excellence.",
            image: "/assets/img/citycenter.jpg",
            schedule: "Service Rotations",
            leader: "Media Head"
        }
    ],
    cta: {
        title: "Ready to Serve?",
        description: "God has given you unique gifts to build His Kingdom. Let us help you find the perfect place to plug in.",
        buttonText: "Join a Ministry"
    }
}
