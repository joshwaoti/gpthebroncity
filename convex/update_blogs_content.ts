import { mutation } from "./_generated/server";
import { v } from "convex/values";

function cleanMarkdown(text: string): string {
    if (!text) return text;
    let cleaned = text;
    // Remove # headings
    cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
    // Remove bold markers
    cleaned = cleaned.replace(/\*\*/g, '');
    // Remove italic markers
    cleaned = cleaned.replace(/\*/g, '');
    // Remove horizontal rules
    cleaned = cleaned.replace(/^---+$/gm, '');
    // Convert bullet points to simple dashes
    cleaned = cleaned.replace(/^-\s+/gm, '');
    // Clean up blockquotes
    cleaned = cleaned.replace(/^>\s*/gm, '');
    return cleaned;
}

const blogsData = [
    {
        slug: "kingdom-mindset",
        title: "Are you Governed by a Kingdom or Worldly Mindset?",
        author: "Rev. Albert Shitakwa",
        publishDate: "June 18, 2023",
        category: "Theology",
        excerpt: "Explore how your perspective shapes your decisions and fruitfulness. Learn to value what God values and maintain a kingdom mindset in all circumstances.",
        imageUrl: "/assets/img/blogs/kingdom_mindset.png",
        content: `Are you Governed by a Kingdom or Worldly Mindset?

Sermon by Rev. Albert Shitakwa
Sunday, June 18, 2023
#GrowingInChristlikeness

Key Takeaways

A kingdom mindset appreciates what God values. A worldly mindset despises it.
Problems that affect the nation affect both believers and non-believers alike.
Gehazi wanted money now. May God give us the discipline to wait for the right time.
God is gracious. He identifies Himself with a deceiver and someone who is messed up.
With a kingdom perspective, you value what God values.
Take care of which direction you go during famine (trouble, pain and problems).
Governed by the kingdom mindset, you will make decisions based on what God has to say.
Don't change your theology because of your tragedy.
God remains God, whether there is a Jezebel (trial) or not.
Look at what is happening around you and problems from a kingdom perspective.
Your independence from God cuts your ability to be fruitful and productive.
Ruth was following someone (Naomi) with a bleak future. She wanted her God.
A kingdom mindset follows God, not because of the benefits that you are going to get.
Unlike the school of prophets, Elisha followed Elijah, saying "I won't let you go."
It's a long drawn battle between one governed by the flesh and another by the spirit.

Introduction

Genesis 25:23-24, 31-32, 34 (NLT)

This teaching concludes a series on putting off the old man and putting on the new man—two manner of people, two cities, and two systems. Galatians 5 expounds the tension between these two: one governed by the flesh and the other by the spirit. The world system versus the kingdom mindset.

Jacob and Esau

Esau represents the flesh, while Jacob represents the spirit.

Esau despised what God valued. Through birthright, God was perpetuating the lineage that would lead to the birth of Christ. If you are governed by a worldly or kingdom mindset, it will manifest in what you value.

When governed by the flesh, we tend to exaggerate problems. Esau said he was about to die. Both houses faced the winds, rains, and storms. In life, we will all face challenges, problems, and trials—born again or not.

Our response reveals whether we are governed by the flesh or the spirit. When governed by the flesh, the problem looks bigger than what it really is. You will be afraid of Goliath, the Philistines, and the enemy. But when governed by a kingdom mindset, you see the same giants but from a kingdom perspective. You place them where they belong.

When you see with God's eye view and perspective, the large problems from a worldly perspective fade and become small. If you have faith as small as a mustard seed, you can say to this mountain... (Matthew 17:20).

The Kingdom Criteria is Different

The criteria used to choose David wasn't the criteria used to choose a king in the world. The kingdom criteria and standard is different from that of the world. The standards you espouse and lift tell what you value—God or the world.

Ruth and Orpah

They are both Moabites. Ruth finds her way into the lineage of Christ, though a Moabite. She became a great-great-grandmother because of some things she said and did. It indicated where she placed her value.

Ruth made the choice to follow Naomi into an unknown future and territory. Ruth represents a kingdom mindset while Orpah represents a worldly mindset.

"But Ruth replied, 'Don't ask me to leave you and turn back. Wherever you go, I will go; wherever you live, I will live. Your people will be my people, and your God will be my God. Wherever you die, I will die, and there I will be buried. May the Lord punish me severely if I allow anything but death to separate us!'" - Ruth 1:16-18 (NLT)

Orpah looked at Naomi and evaluated her circumstances based on what she sees and knows. She would rather die in Moab than follow Ruth, saying "better the devil I know than the place God is telling me to go." Staying in the comfort.

A kingdom mindset follows God, not because of the benefits that you are going to get. Not for bread or prosperity. Following God because of conviction.

Don't Change Your Theology Because of Your Tragedy

Because of what you are going through, you begin to interpret scriptures differently. God remains the same despite what I am going through.

Elijah, coming from a place of victory, is threatened by Jezebel and runs. 450 prophets of Baal killed and all idol worship destroyed. He runs from a threat. If a man who has brought victory is running, it implies Jezebel is more powerful than the God of this man. It was spreading fear in the camp.

God didn't panic. Elijah says "I am the only one left, they have killed all others." He asked God to kill him. God tells him to go to the brook and stay there. For three months, God feeds Elijah, saying nothing. Eating and resting.

Three months later, God tells him that He has 7,000 more that haven't bowed to idols. He asked him to anoint Elisha and Jehu. His job was done.

God remains God, whether there is a Jezebel (trial) or not. When you are in the trial, He is God. Before and after, He remains God. Same yesterday, today and forever. He hasn't changed His love, faithfulness, promise and commitment to you.

Conclusion

When you are governed by the kingdom, the memory of the just is blessed (Proverbs 10:7). Generations will remember you because of the impact, testimony, and legacy you left. When governed by the world, you are forgotten when you leave the stage. Ruth is remembered today, not Orpah.

Be governed by a kingdom mindset.

David and Saul represent this battle perfectly: "That was the beginning of a long war between those who were loyal to Saul and those loyal to David. As time passed David became stronger and stronger, while Saul's dynasty became weaker and weaker." (2 Samuel 3:1 NLT)

Which one is growing stronger or weaker in your life?`
    },
    {
        slug: "spiritual-warfare",
        title: "Spiritual Warfare: Victory Over the Enemy",
        author: "GPT Church - Hebron City",
        publishDate: "October 11, 2023",
        category: "Spiritual Growth",
        excerpt: "Understand the reality of spiritual warfare and learn to stand firm with the armor of God. Discover your authority in Christ over demonic forces.",
        imageUrl: "/assets/img/blogs/spiritual_warfare.png",
        content: `Spiritual Warfare: Victory Over the Enemy

Teaching by GPT Church - Hebron City
Wednesday, October 11, 2023
#GrowingInChristlikeness

Key Takeaways

The reality of spiritual warfare (Ephesians 6:10-18)
Understanding the enemy's tactics and schemes
The armor of God - detailed examination of each piece
Offensive and defensive weapons in spiritual battle
The role of prayer in warfare
Taking thoughts captive (2 Corinthians 10:3-5)
Authority of the believer over demonic forces
The importance of submission to God and resistance to the devil (James 4:7)
Victory through the blood of the Lamb and the word of testimony (Revelation 12:11)
Practical strategies for standing firm in faith

The Reality of Spiritual Warfare

We Are in a Battle

Ephesians 6:12 - "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms."

Important truths:
The battle is real, not imaginary
The enemy is spiritual, not human
We are not unaware of his schemes (2 Corinthians 2:11)
Victory is assured in Christ

The Enemy's Identity

Satan (the devil):
A fallen angel (Isaiah 14:12-15)
The adversary (opponent)
The accuser of the brethren (Revelation 12:10)
The father of lies (John 8:44)
The ruler of this world (John 12:31)

The Enemy's Tactics

1. Deception
Twisting God's Word (Genesis 3:1-5)
False teachings (1 Timothy 4:1)
Counterfeit miracles (2 Thessalonians 2:9)

2. Accusation
Condemning believers (Revelation 12:10)
Bringing up past sins
Making us feel unworthy

3. Temptation
Exploiting weaknesses
Appealing to fleshly desires
Making sin look attractive

4. Discouragement
Making us feel defeated
Amplifying problems
Minimizing God's power

5. Division
Creating conflict in relationships
Sowing seeds of distrust
Breaking unity in the church

The Armor of God

Ephesians 6:13-17 describes the full armor of God:

1. Belt of Truth

"Stand firm then, with the belt of truth buckled around your waist" (v. 14)

Truth of God's Word
Truth about who you are in Christ
Integrity and honesty
Protection against deception

2. Breastplate of Righteousness

"With the breastplate of righteousness in place" (v. 14)

Christ's righteousness, not ours
Right living and holiness
Protection for the heart
Defense against accusation

3. Shoes of the Gospel of Peace

"With your feet fitted with the readiness that comes from the gospel of peace" (v. 15)

Standing on God's promises
Peace with God through Christ
Stability in battle
Readiness to share the gospel

4. Shield of Faith

"Take up the shield of faith, with which you can extinguish all the flaming arrows of the evil one" (v. 16)

Trust in God's character
Confidence in His promises
Protection against doubt
Extinguishes fiery darts

5. Helmet of Salvation

"Take the helmet of salvation" (v. 17)

Assurance of salvation
Protected mind
Hope of eternal life
Defense against discouragement

6. Sword of the Spirit

"And the sword of the Spirit, which is the word of God" (v. 17)

Only offensive weapon listed
The Bible, God's Word
Jesus used it against temptation (Matthew 4)
Sharp and powerful (Hebrews 4:12)

The Role of Prayer

Ephesians 6:18 - "And pray in the Spirit on all occasions with all kinds of prayers and requests. With this in mind, be alert and always keep on praying for all the Lord's people."

Prayer in Warfare

Constant - "On all occasions"
Varied - "All kinds of prayers"
Alert - Watchful and attentive
Persistent - "Keep on praying"
Intercessory - "For all the Lord's people"

Taking Thoughts Captive

2 Corinthians 10:3-5 - "For though we live in the world, we do not wage war as the world does. The weapons we fight with are not the weapons of the world. On the contrary, they have divine power to demolish strongholds. We demolish arguments and every pretension that sets itself up against the knowledge of God, and we take captive every thought to make it obedient to Christ."

The Battle for the Mind

Strongholds to demolish:
Wrong thinking patterns
Lies believed
False arguments
Pride and rebellion

Thoughts to take captive:
Fear to Faith
Worry to Trust
Bitterness to Forgiveness
Defeat to Victory

Authority of the Believer

Our Position in Christ

Seated with Christ - Ephesians 2:6
More than conquerors - Romans 8:37
Authority over demons - Luke 10:19
Victory assured - 1 John 4:4

Exercising Authority

In Jesus' name - John 14:13-14
By the blood - Revelation 12:11
Through the Word - Ephesians 6:17
In faith - James 4:7

Submission and Resistance

James 4:7 - "Submit yourselves, then, to God. Resist the devil, and he will flee from you."

Two-Part Strategy

1. Submit to God
Surrender your will
Obey His commands
Trust His plan

2. Resist the Devil
Stand firm in faith
Speak God's Word
Refuse to compromise

Promise: "He will flee from you" - The enemy must retreat!

Victory Through the Blood and Testimony

Revelation 12:11 - "They triumphed over him by the blood of the Lamb and by the word of their testimony; they did not love their lives so much as to shrink from death."

Three Keys to Victory

1. The Blood of the Lamb
Christ's sacrifice
Forgiveness of sins
Defeat of Satan's accusations

2. The Word of Our Testimony
What God has done
Declaring His faithfulness
Sharing our story

3. Not Loving Our Lives
Willing to sacrifice
Committed to Christ
Overcoming fear

Practical Strategies for Victory

Daily Practices

Put on the armor - Daily prayer and declaration
Study Scripture - Know and use God's Word
Pray constantly - Stay connected to God
Fellowship - Don't fight alone
Worship - Praise confuses the enemy
Fast - Break strongholds
Confess sin - Keep short accounts
Forgive - Don't give the enemy a foothold

When Under Attack

Recognize it - Identify the attack
Resist - Stand firm in faith
Declare truth - Speak Scripture
Call for help - Ask for prayer
Praise - Worship through the battle

Conclusion

You are not a victim—you are a victor!

Romans 8:37 - "No, in all these things we are more than conquerors through him who loved us."

Remember:
The battle is real, but victory is assured
You have powerful weapons at your disposal
You have authority in Christ's name
You are not fighting alone
The enemy is defeated

Stand firm. Put on the full armor of God. Resist the devil. And watch him flee from you!`
    },
    {
        slug: "raising-christlike-children",
        title: "Raising Christlike Children",
        author: "Joseph Ngaara",
        publishDate: "August 16, 2023",
        category: "Family",
        excerpt: "Practical wisdom on raising Christlike children who bring joy and glory to God and their parents.",
        imageUrl: "/assets/img/blogs/raising_children.png",
        content: `Raising Christlike Children

Teaching by Joseph Ngaara
Wednesday, August 16, 2023
#GrowingInChristlikeness

Key Takeaways

We are called to raise Christlike children. They will bring us pride.
Christlike children make their parents shine.
Parents, we have so many opportunities to instruct our children.
Did you know that your child has a magnificent, famous and glorious assignment?
What are you doing to enable success and Christlikeness in your child?
To be Christlike, children need parents who will instruct them, pray for them, provide for them and charge them towards their God-given agenda and assignment.
Absalom was a shameful child. He caused his father, David to run away in pain.
Proverbs 29:15 - children left to themselves bring shame to their parents.
Children who disappoint are a tragedy to the community and not just their parents.
It is not enough to be Christlike, we must be intentional in raising Christlike children.
To raise Christlike children, parents and the society need to call out foolishness in children and drive it away.
Children become what they watch.

Introduction

This is Children's Church Week. Our theme as a church this year has been 'Growing In Christlikeness'. Today we build on these teachings, but with a focus not on ourselves but our children. I want to talk about Raising Christlike Children.

This message is for everyone who has a child in their lives, in whatever capacity:
Biological and adoptive parents (like Joseph to Jesus, Joash to Gideon)
Cousins (like Mordecai to Esther), and uncles (like Jonathan to David)
Grandparents (like Lois to Timothy). It takes a whole village to raise a child.

1. Christlike Children Bring Pride To Their Parents

In the bible we find a number of children who brought pride to their parents by what they achieved:

David (1 Samuel 17:34-37): A shepherd boy who jealously tendered his father's flock and fought off bears and lions to rescue the sheep.
Gideon (Judges 6:25): He courageously destroyed his father's idols.
The boy with 5 loaves and 2 fish (John 6:8-11): He gave Jesus his packed lunch, which Jesus multiplied and fed the hungry multitude.
Solomon: David prepared his son Solomon to take over as king of Israel.

"Now, my son, may the Lord be with you and give you success as you follow his directions in building the Temple of the Lord your God." - 1 Chronicles 22:11 (NLT)

Here we see David call his son, instruct him, provide for him, and pray for him to be successful. Is that what you do for your children?

Children don't just make their parents proud. Their parents intentionally instruct, pray, provide and charge them to undertake God's assignment in their lives.

Opportunities to Instruct

Parents, we have so many opportunities to instruct our children:
In the morning, when they are having breakfast
In the evening when they are doing homework or having dinner

Don't just give them work to do or gadgets to watch. Instruct them, pray and provide for and charge them to undertake God's assignments in their lives.

"So take this seriously. The Lord has chosen you to build a Temple as his sanctuary. Be strong, and do the work." - 1 Chronicles 28:10 (NLT)

2. UnChristlike Children Bring Shame To Their Communities

We have just said that Christlike children are the pride of their parents. The opposite is also true. UnChristlike children bring shame to their communities.

Examples of Foolishness in Children

Absalom (David's son):
When Amnon raped his sister, Absalom deeply hated him and planned revenge
He made him drunk and called men to kill him
Anger is a powerful emotion that can result in foolish actions and murder (Matthew 5:21-23)
Absalom went further to stir up a rebellion against his father David
He made David run away from his kingdom and slept with David's concubines

Eli's wicked sons (Hophni and Phinehas - 1 Samuel 2:12):
Unfortunately, all Eli did was confront them with a slap on the wrist
They were scoundrels who didn't even listen to their father

Samuel's eldest children (Joel and Abijah - 1 Samuel 8:1-3):
Samuel was the Prophet through whom God started and stopped King Saul's rule in Israel
Yet his children had corruption and greed bound in their hearts

"A youngster's heart is filled with foolishness, but physical discipline will drive it far away." - Proverbs 22:15 (NLT)

Although both Eli and Samuel were men of God, it is not enough to be Christlike—we must be intentional in raising Christlike children.

3. Children Become What They Watch

"We become what we behold." Children are no exception.

So, the question is: Are your children watching Christlike content?

As parents, are we placing Christlike content before our children? What the teacher said made me realize that children become what they watch.

Questions for Parents

What kind of parent are you? If you died today, would people scramble for your children?
Are you effectively using your parenting role to instruct, provide, and pray for your child?
What foolishness is bound in the heart of your child?
How are you driving away the foolishness bound in the heart of your child?

Remember: If children are not raised, they will still grow up. The choice is yours, just like growing in Christlikeness is a choice we have to make.

Conclusion

To raise Christlike children:
1. Instruct them - Use every opportunity to teach God's ways
2. Pray for them - Cover them in prayer consistently
3. Provide for them - Meet their needs and prepare them for their assignment
4. Charge them - Speak God's words and success into their lives
5. Drive out foolishness - Call out and correct ungodly behavior
6. Model Christlike content - Let them watch and learn from godly examples

Fathers determine the success or failure in the lives of their children. Your child has a magnificent, famous and glorious assignment. What are you doing to enable success and Christlikeness in your child?`
    },
    {
        slug: "power-of-prayer",
        title: "The Power of Prayer and Developing an Effective Prayer Life",
        author: "GPT Church - Hebron City",
        publishDate: "August 27, 2023",
        category: "Spiritual Growth",
        excerpt: "Learn about the power of prayer and how to develop a consistent, effective prayer life that transforms your relationship with God.",
        imageUrl: "/assets/img/blogs/prayer_power.png",
        content: `The Power of Prayer and Developing an Effective Prayer Life

Teaching by GPT Church - Hebron City
Wednesday, August 27, 2023
#GrowingInChristlikeness

Key Takeaways

Prayer is communication with God - the lifeline of every believer
Understand different types of prayer: Adoration, Confession, Thanksgiving, Supplication (ACTS model)
Biblical examples of powerful prayer: Elijah, Daniel, Paul
Overcome barriers to prayer: distraction, doubt, inconsistency
The importance of persistence in prayer (Luke 18:1-8)
Pray according to God's will
The role of faith in prayer
Corporate prayer vs. private prayer
Practical tips for establishing a consistent prayer routine

Understanding Prayer

Prayer is simply communication with God. It's the breath of the soul and the lifeline of every believer. Through prayer, we:
Express our love and worship to God
Confess our sins and receive forgiveness
Thank God for His blessings
Present our requests and intercede for others

The ACTS Model of Prayer

A - Adoration
Worship God for who He is. Acknowledge His attributes, character, and majesty.

C - Confession
Confess your sins and ask for forgiveness. Keep short accounts with God.

T - Thanksgiving
Thank God for what He has done. Count your blessings and express gratitude.

S - Supplication
Present your requests to God. Pray for yourself (petition) and others (intercession).

Biblical Examples of Powerful Prayer

Elijah
James 5:17-18 tells us that Elijah was a man just like us, yet his prayers were powerful:
He prayed for no rain, and it didn't rain for 3.5 years
He prayed for rain, and the heavens gave rain
His prayer on Mount Carmel brought fire from heaven

Daniel
Daniel 6:10 - Despite the decree against prayer, Daniel:
Prayed three times a day
Knelt on his knees
Gave thanks to God
Prayed with his windows open toward Jerusalem

Paul
Throughout his epistles, Paul consistently:
Prayed for the churches
Prayed for spiritual growth
Prayed for understanding and wisdom
Prayed even from prison

Overcoming Barriers to Prayer

1. Distraction
Find a quiet place
Set a specific time
Use prayer lists or journals
Start with shorter, focused sessions

2. Doubt
Remember God's faithfulness
Meditate on His promises
Start with thanksgiving
Build faith through God's Word

3. Inconsistency
Establish a routine
Set reminders
Find a prayer partner
Join corporate prayer meetings

The Importance of Persistence

Luke 18:1-8 - The Parable of the Persistent Widow

Jesus told this parable to show that we should always pray and not give up. If an unjust judge eventually granted justice because of persistence, how much more will our loving Father answer our prayers?

Key principles:
Keep praying even when you don't see immediate answers
Don't lose heart
God's timing is perfect
Persistence demonstrates faith

Praying According to God's Will

1 John 5:14-15 - "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us."

How to pray according to God's will:
Study God's Word to know His will
Pray the Scriptures back to God
Seek the Holy Spirit's guidance
Align your heart with God's heart

The Role of Faith in Prayer

Matthew 21:22 - "If you believe, you will receive whatever you ask for in prayer."

Faith is essential in prayer:
Believe that God exists
Believe that He rewards those who earnestly seek Him
Believe that He is able to do what you're asking
Believe even before you see the answer

Corporate Prayer vs. Private Prayer

Private Prayer
Personal intimacy with God
Secret place communion
Personal requests and intercession
Spiritual discipline

Corporate Prayer
Unity in the body of Christ
Agreement and harmony
Collective faith and power
Encouragement and accountability

Matthew 18:19 - "Again, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven."

Practical Tips for a Consistent Prayer Life

1. Set a specific time - Morning, evening, or whenever you're most alert
2. Find a specific place - A quiet corner, prayer room, or outdoor space
3. Start small - Begin with 10-15 minutes and gradually increase
4. Use a prayer list - Keep track of requests and answers
5. Pray the Scriptures - Use Psalms and other passages
6. Keep a prayer journal - Record your prayers and God's answers
7. Find accountability - Partner with someone for prayer
8. Join prayer meetings - Participate in corporate prayer
9. Use reminders - Set alarms or notifications
10. Be flexible - Adjust as needed but don't abandon the habit

Conclusion

Prayer is not just a religious duty—it's a privilege and a powerful tool God has given us. As we develop our prayer lives, we grow closer to God, experience His power, and see His will done on earth as it is in heaven.

Start today. Commit to a consistent prayer life. Watch God move in your life and through your prayers.`
    }
];

export const run = mutation({
    args: {},
    handler: async (ctx) => {
        let updated = 0;
        
        for (const blogData of blogsData) {
            const existing = await ctx.db.query("blogPosts")
                .filter(q => q.eq(q.field("slug"), blogData.slug))
                .first();
            
            if (existing) {
                await ctx.db.patch(existing._id, {
                    title: blogData.title,
                    author: blogData.author,
                    publishDate: blogData.publishDate,
                    category: blogData.category,
                    excerpt: blogData.excerpt,
                    imageUrl: blogData.imageUrl,
                    content: blogData.content,
                });
                updated++;
            }
        }
        
        return `Updated ${updated} blog posts with clean content`;
    },
});
