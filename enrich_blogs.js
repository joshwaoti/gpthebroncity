const fs = require('fs');
const extracted = JSON.parse(fs.readFileSync('blogs_extracted.json', 'utf8'));

const blogsBase = [
    {
        title: "Are you Governed by a Kingdom or Worldly Mindset?",
        category: "Theology",
        excerpt: "Are you governed by a Kingdom or Worldly mindset? Explore how our perspective shapes our decisions and fruitfulness.",
        author: "Rev. Albert Shitakwa",
        publishDate: "June 18, 2023",
        imageUrl: "/assets/img/blogs/kingdom_mindset.png",
        slug: "kingdom-mindset",
        filename: "Sermon_GPT Church - Hebron City_June 18, 2023.pdf"
    },
    {
        title: "Raising Christlike Children",
        category: "Family",
        excerpt: "Practical wisdom on raising Christlike children who bring joy and glory to God and their parents.",
        author: "Joseph Ngaara",
        publishDate: "August 16, 2023",
        imageUrl: "/assets/img/blogs/raising_children.png",
        slug: "raising-christlike-children",
        filename: "Teaching_GPT Church - Hebron City_August 16, 2023.pdf"
    },
    {
        title: "The Culture Of A Transformed Community",
        category: "Community",
        excerpt: "Insights into the culture of the early church and how consistency in fellowship transforms a community.",
        author: "Rev. Albert Shitakwa",
        publishDate: "August 27, 2023",
        imageUrl: "/assets/img/blogs/transformed_community.png",
        slug: "transformed-community",
        filename: "Teaching_GPT Church - Hebron City_August 27, 2023.pdf"
    },
    {
        title: "What We Must Do To Grow - Become Restless",
        category: "Growth",
        excerpt: "What must we do to grow? Learn why becoming restless with the status quo is the first step to spiritual progress.",
        author: "Rev. Albert Shitakwa",
        publishDate: "July 26, 2023",
        imageUrl: "/assets/img/blogs/becoming_restless.png",
        slug: "becoming-restless",
        filename: "Teaching_GPT Church - Hebron City_July 26, 2023.pdf"
    },
    {
        title: "We Need To Grow: Change Is Critical For Growth",
        category: "Growth",
        excerpt: "Change is critical for growth. Discover why spiritual maturity requires activation and a willingness to leave the familiar.",
        author: "Rev. Albert Shitakwa",
        publishDate: "July 5, 2023",
        imageUrl: "/assets/img/blogs/change_critical.png",
        slug: "change-is-critical",
        filename: "Teaching_GPT Church - Hebron City_July 5, 2023.pdf"
    },
    {
        title: "Growing Holistically",
        category: "Growth",
        excerpt: "God is interested in your growth in all dimensions: spiritually, physically, intellectually, and socially.",
        author: "Rev. Albert Shitakwa",
        publishDate: "May 31, 2023",
        imageUrl: "/assets/img/blogs/growing_holistically.png",
        slug: "growing-holistically",
        filename: "Teaching_GPT Church - Hebron City_May 31, 2023.pdf"
    },
    {
        title: "Intentional Spiritual Growth - Add Perseverance to your Faith",
        category: "Growth",
        excerpt: "Intentional spiritual growth through perseverance. Learn how to build the muscle of endurance in your walk with Christ.",
        author: "Rev. Albert Shitakwa",
        publishDate: "October 11, 2023",
        imageUrl: "/assets/img/blogs/intentional_growth.png",
        slug: "intentional-spiritual-growth",
        filename: "Teaching_GPT Church - Hebron City_October 11, 2023.pdf"
    },
    {
        title: "Your Doctrine And Manner Of Life",
        category: "Doctrine",
        excerpt: "Your doctrine and manner of life should be one. Explore why true Christlikeness is found in the fruit we produce.",
        author: "Rev. Albert Shitakwa",
        publishDate: "October 22, 2023",
        imageUrl: "/assets/img/blogs/doctrine_life.png",
        slug: "doctrine-and-life",
        filename: "Teaching_GPT Church - Hebron City_October 22, 2023.pdf"
    },
    {
        title: "The Early Church Was Consistent In Worship",
        category: "Worship",
        excerpt: "Lessons from the early church on consistent congregational worship and its impact on the community.",
        author: "Rev. Albert Shitakwa",
        publishDate: "September 17, 2023",
        imageUrl: "/assets/img/blogs/early_church_worship.png",
        slug: "early-church-worship",
        filename: "Teaching_GPT Church - Hebron City_September 17, 2023.pdf"
    }
];

const enriched = blogsBase.map(b => {
    const ext = extracted.find(e => e.filename === b.filename);
    return {
        ...b,
        content: ext ? ext.content : "Content from " + b.filename,
        filename: undefined
    };
});

fs.writeFileSync('blogs_enriched.json', JSON.stringify(enriched, null, 2));
console.log('Enriched JSON written to blogs_enriched.json');
