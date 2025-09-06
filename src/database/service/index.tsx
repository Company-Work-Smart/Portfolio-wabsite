import appColor from "@/theme/appColor";
import { Code, Smartphone, Storage, Brush } from "@mui/icons-material";
import { JSX } from "react";

export interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: <Code sx={{ fontSize: 40, color: appColor.white }} />,
    title: "Web Development",
    description:
      "Full-stack web applications with modern technologies and best practices.",
  },
  {
    icon: <Smartphone sx={{ fontSize: 40, color: appColor.white }} />,
    title: "Mobile Development",
    description: "Cross-platform mobile applications for iOS and Android.",
  },
  {
    icon: <Storage sx={{ fontSize: 40, color: appColor.white }} />,
    title: "Backend Engineering",
    description:
      "Robust and scalable server-side systems, APIs, and database management.",
  },
  {
    icon: <Brush sx={{ fontSize: 40, color: appColor.white }} />,
    title: "UI/UX Design",
    description:
      "User-focused interface design with responsive and accessible layouts.",
  },
];
