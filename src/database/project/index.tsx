export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  github: string;
  live: string;
  featured: boolean;
  status: "Soon" | "Live" | "In Progress" | "Completed";
  date: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment integration, and admin dashboard.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Material-UI"],
    category: "Web Development",
    github: "https://github.com/username/ecommerce",
    live: "https://ecommerce-demo.com",
    featured: true,
    status: "Soon",
    date: "2024",
  },
  {
    id: 2,
    title: "Mobile Task Manager",
    description:
      "A React Native mobile app for task management with offline synchronization, push notifications, and collaborative features.",
    image: "/api/placeholder/400/250",
    technologies: ["React Native", "Firebase", "Redux", "AsyncStorage"],
    category: "Mobile Development",
    github: "https://github.com/username/task-manager",
    live: "https://play.google.com/store/apps/details?id=com.taskmanager",
    featured: true,
    status: "Live",
    date: "2024",
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for data analytics with real-time charts, filters, and export capabilities using D3.js and Chart.js.",
    image: "/api/placeholder/400/250",
    technologies: ["Vue.js", "D3.js", "Chart.js", "Python", "FastAPI"],
    category: "Data Science",
    github: "https://github.com/username/data-dashboard",
    live: "https://data-viz-demo.com",
    featured: false,
    status: "Completed",
    date: "2023",
  },
  {
    id: 4,
    title: "Design System Library",
    description:
      "A comprehensive design system with reusable components, documentation, and style guides for consistent UI development.",
    image: "/api/placeholder/400/250",
    technologies: ["Storybook", "Styled Components", "TypeScript", "Figma"],
    category: "Design",
    github: "https://github.com/username/design-system",
    live: "https://design-system-demo.com",
    featured: false,
    status: "Completed",
    date: "2023",
  },
  {
    id: 5,
    title: "AI Chat Application",
    description:
      "Real-time chat application with AI integration, message encryption, and multimedia support using WebSocket technology.",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "Socket.io", "OpenAI API", "MongoDB"],
    category: "Web Development",
    github: "https://github.com/username/ai-chat",
    live: "https://ai-chat-demo.com",
    featured: true,
    status: "In Progress",
    date: "2024",
  },
  {
    id: 6,
    title: "Blockchain Portfolio Tracker",
    description:
      "Cryptocurrency portfolio tracker with real-time price updates, transaction history, and performance analytics.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Web3.js", "Ethereum", "Chart.js"],
    category: "Blockchain",
    github: "https://github.com/username/crypto-tracker",
    live: "https://crypto-tracker-demo.com",
    featured: false,
    status: "Live",
    date: "2023",
  },
];

export const categories = ["All", "Web Development", "Mobile Development", "Data Science", "Design", "Blockchain"];