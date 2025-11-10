/**
 * Type definitions for Gibbs Agency project
 */

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  avatar: string
  rating: number
}

export interface TechStack {
  id: string
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tool' | 'database'
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface ContactForm {
  name: string
  email: string
  company?: string
  message: string
}

