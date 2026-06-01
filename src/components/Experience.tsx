"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Calendar, Briefcase } from "lucide-react";

interface ExperienceItem {
    company: string;
    position: string;
    duration: string;
    location?: string;
    achievements: string[];
    active?: boolean;
}

const experiences: ExperienceItem[] = [
    {
        company: "Tend",
        position: "Software Engineer",
        duration: "May 2026 - Present",
        active: true,
        achievements: [
            "Starting a new chapter as a Software Engineer at Tend, building innovative healthcare technology solutions.",
        ],
    },
    {
        company: "Abre",
        position: "Software Engineer II",
        duration: "Jan 2024 - Apr 17, 2026",
        active: false,
        achievements: [
            "Spearheaded the development of a cloud-native data integration platform on Google Cloud Platform (GCP) that ingested 150+ education formats via secure APIs/SFTP into BigQuery, which reduced database load by 40%.",
            "Fortified data security by containerizing SFTP servers with Docker and Terraform; implemented strict IP allow-lists and key-based authentication, resolving 4 critical vulnerabilities.",
            "Engineered a Golang ingestion pipeline in GCP, processing 45+GB zip files and encoding thousands, reducing manual processing by 10+ hours monthly, and improving application availability.",
            "Authored detailed documentation for GCP cloud infrastructure utilizing Terraform, slashing new engineer onboarding time by 50% and accelerating project integration by 30% within the team.",
            "Led the creation of detailed API documentation, including SFTP protocols, enabling new engineers to deploy code within the first week, improving initial productivity.",
            "Developed a structured behavioral interview question set, decreasing time-to-hire by 15% for Software and Data Engineer roles across six-round interview processes; improved candidate quality scores by 20%.",
            "Championed a bi-weekly code review program, personally reviewing 30+ pull requests monthly across all experience levels, resulting in a 30% reduction in pre-deployment holds.",
            "Collaborated with cross-functional teams to resolve integration complexities, achieving consistent sub-24-hour resolution times for P1 tickets and fostering greater trust across the organization.",
        ],
    },
    {
        company: "Total Expert",
        position: "Engineer II SDET",
        duration: "Jun 2021 - Dec 2023",
        active: false,
        achievements: [
            "Maintained email deliverability for over 10 million daily fintect emails, supporting ongoing marketing campaigns and maintaining 99.98% platform uptime with zero downtime incidents on AWS.",
            "Implemented a suite of Python/SQL scripts for automated log analysis, enabling rapid detection of anomalies and reduced the number of high-priority escalations by 20% within six months. Monitored on DataDog and AWS.",
            "Optimized SQL queries and database schemas in SQL, leading to a 50% reduction in query execution times and improved overall system performance.",
        ],
    },
    {
        company: "Apple Inc",
        position: "Software Engineer | Wireless/Cellular",
        duration: "Jul 2015 - Jun 2021",
        active: false,
        achievements: [
            "Engineered Python scripts leveraging regular expressions and pattern matching, enabling rapid identification of urgent VIP wireless support tickets, reducing executive escalation response times to less than four hours.",
            "Designed and maintained real-time Splunk dashboards visualizing geospatial wireless Key Performance Indicators (KPIs) across major U.S. carriers, cutting issue investigation time by 30% and improving network performance.",
        ],
    },
];

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [expandedItems, setExpandedItems] = useState<number[]>([0]);

    const toggleExpanded = (index: number) => {
        setExpandedItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
    };

    return (
        <section ref={ref} className="py-24 section-padding relative z-10">
            <div className="container-max">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    className="flex flex-col items-center justify-center mb-16"
                >
                    <span className="text-secondary-600 font-semibold tracking-wider text-sm uppercase mb-3">
                        Timeline
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight text-center">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Main Clean Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-200 via-secondary-200 to-transparent md:left-8" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -30 }
                            }
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative mb-12 last:mb-0 pl-20 md:pl-24"
                        >
                            {/* Timeline Dot */}
                            <div
                                className={`absolute left-[18px] md:left-[26px] top-8 w-6 h-6 rounded-full border-4 border-[#f8fafc] flex items-center justify-center z-10 shadow-sm ${
                                    exp.active
                                        ? "bg-primary-500 shadow-primary-500/30"
                                        : "bg-gray-300"
                                }`}
                            >
                                {exp.active && (
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                )}
                            </div>

                            <div className="glass-panel overflow-hidden">
                                <div
                                    className="cursor-pointer p-6 md:p-8"
                                    onClick={() => toggleExpanded(index)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                {exp.active && (
                                                    <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100">
                                                        CURRENT ROLE
                                                    </span>
                                                )}
                                                <span className="text-xl lg:text-2xl font-bold text-gray-900">
                                                    {exp.position}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-lg font-medium text-secondary-600 mb-4">
                                                <Briefcase className="w-4 h-4" />
                                                {exp.company}
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                                <Calendar className="w-4 h-4" />
                                                <span>{exp.duration}</span>
                                            </div>
                                        </div>

                                        <motion.div
                                            className="hidden md:flex p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                                            animate={{
                                                rotate: expandedItems.includes(
                                                    index,
                                                )
                                                    ? 180
                                                    : 0,
                                            }}
                                        >
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: expandedItems.includes(
                                                index,
                                            )
                                                ? "auto"
                                                : 0,
                                            opacity: expandedItems.includes(
                                                index,
                                            )
                                                ? 1
                                                : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-6 border-t border-gray-100 mt-6 text-gray-600">
                                            <ul className="space-y-4">
                                                {exp.achievements.map(
                                                    (achievement, achIndex) => (
                                                        <li
                                                            key={achIndex}
                                                            className="flex items-start gap-4"
                                                        >
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex-shrink-0" />
                                                            <p className="leading-relaxed text-sm md:text-base">
                                                                {achievement}
                                                            </p>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </motion.div>

                                    {/* Mobile toggle indicator */}
                                    <div className="w-full flex justify-center mt-4 md:hidden">
                                        <motion.div
                                            animate={{
                                                rotate: expandedItems.includes(
                                                    index,
                                                )
                                                    ? 180
                                                    : 0,
                                            }}
                                        >
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
