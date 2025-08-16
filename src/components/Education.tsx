'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Calendar, Award } from 'lucide-react'

interface EducationItem {
  institution: string
  degree: string
  duration: string
  status: string
  details?: string
}

const education: EducationItem[] = [
  {
    institution: "University of the People",
    degree: "BS, Computer Science",
    duration: "Jan 2023 - Dec 2027",
    status: "In Progress",
    details: "GPA: In-Progress"
  },
  {
    institution: "Woz-U",
    degree: "Diploma, Data Science",
    duration: "Feb 2020 - Dec 2020",
    status: "Graduated",
    details: "Achievements: Graduated"
  }
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding bg-apple-gray-50">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-apple-gray-800 mb-16 text-center"
        >
          Education
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline line */}
              {index < education.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-apple-blue-500 to-apple-gray-300" />
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-4 top-8 w-4 h-4 bg-apple-blue-500 rounded-full ring-4 ring-white shadow-lg" />
              
              <div className="ml-16">
                <div className="glass-effect rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-apple-blue-500 to-apple-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-apple-gray-800 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-lg font-semibold text-apple-blue-500 mb-2">
                        {edu.institution}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-apple-gray-500 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            edu.status === 'Graduated' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {edu.status}
                          </span>
                        </div>
                      </div>
                      
                      {edu.details && (
                        <p className="text-apple-gray-600">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
