import appColor from "@/theme/appColor";
import { Code, MenuBook, School } from "@mui/icons-material";
import { JSX } from "react";

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  description: string;
  achievements: string[];
  icon: JSX.Element;
}
export const education: Education[] = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2020 - 2022",
    gpa: "3.8/4.0",
    description:
      "Specialized in Machine Learning and Software Engineering. Completed thesis on 'Advanced Neural Networks for Natural Language Processing'.",
    achievements: [
      "Dean's List (4 semesters)",
      "Graduate Research Assistant",
      "Published 2 research papers",
    ],
    icon: <School sx={{ fontSize: 40, color: appColor.textpurple}} />,
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2016 - 2020",
    gpa: "3.9/4.0",
    description:
      "Graduated Summa Cum Laude with focus on Full-Stack Development and Database Systems.",
    achievements: [
      "Summa Cum Laude",
      "Valedictorian",
      "ACM Programming Contest Winner",
    ],
    icon: <Code sx={{ fontSize: 40, color:  appColor.textpurple }} />,
  },
  {
    degree: "High School Diploma",
    institution: "Tech Prep Academy",
    location: "San Francisco, CA",
    period: "2012 - 2016",
    gpa: "4.0/4.0",
    description:
      "Focused on STEM subjects with advanced placement in Computer Science and Mathematics.",
    achievements: [
      "Valedictorian",
      "National Merit Scholar",
      "Science Fair State Champion",
    ],
    icon: <MenuBook sx={{ fontSize: 40, color:  appColor.textpurple}} />,
  },
];



export const languages = [
  { name: "English", level: "Native" },
  { name: "Spanish", level: "Fluent" },
  { name: "French", level: "Intermediate" },
  { name: "Mandarin", level: "Basic" },
];

export const courses = [
  "Advanced Algorithms and Data Structures",
  "Machine Learning & AI",
  "Database Systems",
  "Software Architecture",
  "Cybersecurity Fundamentals",
  "Cloud Computing",
  "Mobile App Development",
  "Web Development Bootcamp",
];

export const certifications = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional",
  "Microsoft Azure Developer",
  "Certified Kubernetes Administrator",
  "Oracle Java SE Programmer",
  "MongoDB Certified Developer",
];
