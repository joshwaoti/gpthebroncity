"use client"

import { useState } from 'react';
import { Linkedin, Twitter, Instagram, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    social?: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        behance?: string;
    };
}

const PASTORS: TeamMember[] = [
    {
        id: '1',
        name: 'Pst Albert Shitakwa',
        role: 'Lead Pastor',
        image: '/pst/pst_albert.jpg',
    },
    {
        id: '2',
        name: 'Pst Erastus Munyao',
        role: 'Associate Pastor',
        image: '/pst/pst_erastus.jpg',
    },
    {
        id: '3',
        name: 'Pst Sam Mbugua',
        role: 'Zonal Fellowships',
        image: '/pst/pst_sam.jpg',
    },
    {
        id: '4',
        name: 'Pst Charles Mulama',
        role: 'Worship & Media',
        image: '/pst/pst_mulama.jpg',
    },
    {
        id: '5',
        name: 'Pst Maurice Prosperity',
        role: 'Discipleship & Outreach',
        image: '/pst/pst_maurice.jpg',
    },
    {
        id: '6',
        name: 'Pst Joseph Ngaara',
        role: 'Children Ministry',
        image: '/pst/pst_ngara.jpg',
    },
    {
        id: '7',
        name: 'Pst Tony Shivega',
        role: 'Youth and Teens',
        image: '/pst/pst_tony.jpg',
    }
];

interface TeamShowcaseProps {
    members?: TeamMember[];
}

export default function TeamShowcase({ members = PASTORS }: TeamShowcaseProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Custom assignments based on user logic:
    // Left column: 2 items (Erastus [1], Charles [3])
    // Center column: 3 items (Albert [0], Maurice [4], Tony [6]) - Albert on top.
    // Right column: 2 items (Sam Mbugua [2], Joseph [5])

    const leftCol = [members[1], members[3]]; // Erastus, Charles
    const centerCol = [members[0], members[4], members[6]]; // Albert, Maurice, Tony
    const rightCol = [members[2], members[5]]; // Sam Mbugua, Joseph

    return (
        <section className="w-full py-16 md:py-24 border-t border-border mt-10">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-center gap-3 mb-12">
                    <div className="w-12 h-[2px] bg-[#C8A229]" />
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Our <span className="text-[#257300] dark:text-[#B2CB20]">Pastors</span>
                    </h2>
                    <div className="w-12 h-[2px] bg-[#C8A229]" />
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full">
                    {/* ── Left: photo grid ── */}
                    <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0 w-full md:w-3/5 justify-center md:justify-start">
                        {/* Left Column */}
                        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
                            {leftCol.map((member) => (
                                <PhotoCard
                                    key={member.id}
                                    member={member}
                                    className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
                                    hoveredId={hoveredId}
                                    onHover={setHoveredId}
                                />
                            ))}
                        </div>

                        {/* Center Column - top level so Albert is at the absolute top */}
                        <div className="flex flex-col gap-2 md:gap-3">
                            {centerCol.map((member) => (
                                <PhotoCard
                                    key={member.id}
                                    member={member}
                                    className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
                                    hoveredId={hoveredId}
                                    onHover={setHoveredId}
                                />
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
                            {rightCol.map((member) => (
                                <PhotoCard
                                    key={member.id}
                                    member={member}
                                    className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
                                    hoveredId={hoveredId}
                                    onHover={setHoveredId}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Right: member name list*/}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-6 pt-0 md:pt-10 flex-1 w-full justify-center">
                        {members.map((member) => (
                            <MemberRow
                                key={member.id}
                                member={member}
                                hoveredId={hoveredId}
                                onHover={setHoveredId}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
    member,
    className,
    hoveredId,
    onHover,
}: {
    member: TeamMember;
    className: string;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
}) {
    const isActive = hoveredId === member.id;
    const isDimmed = hoveredId !== null && !isActive;

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-all duration-500',
                className,
                isDimmed ? 'opacity-40 scale-95 blur-[1px]' : 'opacity-100 scale-100',
                isActive && 'ring-2 ring-primary shadow-2xl z-10 scale-105'
            )}
            onMouseEnter={() => onHover(member.id)}
            onMouseLeave={() => onHover(null)}
        >
            <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-all duration-700 hover:scale-110"
                style={{
                    filter: isActive ? 'grayscale(0) brightness(1.1) contrast(1.1)' : 'grayscale(0.6) brightness(0.8)',
                }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
    member,
    hoveredId,
    onHover,
}: {
    member: TeamMember;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
}) {
    const isActive = hoveredId === member.id;
    const isDimmed = hoveredId !== null && !isActive;
    const hasSocial = member.social?.twitter ?? member.social?.linkedin ?? member.social?.instagram ?? member.social?.behance;

    return (
        <div
            className={cn(
                'cursor-pointer transition-all duration-300 transform',
                isDimmed ? 'opacity-40 blur-[0.5px] -translate-x-2' : 'opacity-100',
                isActive ? 'translate-x-2' : ''
            )}
            onMouseEnter={() => onHover(member.id)}
            onMouseLeave={() => onHover(null)}
        >
            {/* Name + social*/}
            <div className="flex items-center gap-3">
                <span
                    className={cn(
                        'w-4 h-1.5 rounded-full flex-shrink-0 transition-all duration-500',
                        isActive ? 'bg-primary w-8' : 'bg-primary/20',
                    )}
                />
                <span
                    className={cn(
                        'text-lg md:text-xl font-bold leading-none tracking-tight transition-colors duration-300 font-display',
                        isActive ? 'text-primary dark:text-primary' : 'text-foreground/80',
                    )}
                >
                    {member.name}
                </span>

                {/* Social icons */}
                {hasSocial && (
                    <div
                        className={cn(
                            'flex items-center gap-1.5 ml-2 transition-all duration-300',
                            isActive
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-4 pointer-events-none',
                        )}
                    >
                        {member.social?.twitter && (
                            <a
                                href={member.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-full bg-primary/10 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 hover:scale-110"
                                title="X / Twitter"
                            >
                                <Twitter size={12} strokeWidth={2.5} />
                            </a>
                        )}
                        {member.social?.linkedin && (
                            <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-full bg-primary/10 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 hover:scale-110"
                                title="LinkedIn"
                            >
                                <Linkedin size={12} strokeWidth={2.5} />
                            </a>
                        )}
                        {member.social?.instagram && (
                            <a
                                href={member.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-full bg-primary/10 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 hover:scale-110"
                                title="Instagram"
                            >
                                <Instagram size={12} strokeWidth={2.5} />
                            </a>
                        )}
                        {member.social?.behance && (
                            <a
                                href={member.social.behance}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-full bg-primary/10 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 hover:scale-110"
                                title="Web"
                            >
                                <Globe size={12} strokeWidth={2.5} />
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Role */}
            <p className={cn(
                "mt-2 pl-[44px] text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                isActive ? "text-[#C8A229]" : "text-muted-foreground"
            )}>
                {member.role}
            </p>
        </div>
    );
}
