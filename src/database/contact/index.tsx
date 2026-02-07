import {
  Email,
  GitHub,
  LinkedIn,
  LocationOn,
  Phone,
  Telegram,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";

export interface Contact {
  icon: JSX.Element;
  title: string;
  value: string;
  description: string;
  action: string;
}

export const contact: Contact[] = [
  {
    icon: <Email sx={{ fontSize: 40}} />,
    title: "Email",
    value: "sengvichet2525@gmail.com",
    description: "Send me an email anytime",
    action: "sengvichet2525@gmail.com",
  },
  {
    icon: <Phone sx={{ fontSize: 40}} />,
    title: "Phone",
    value: "(+855) 092 736 061",
    description: "Call me for urgent matters",
    action: "092736061",
  },
  {
    icon: <LocationOn sx={{ fontSize: 40 }} />,
    title: "Location",
    value: "Phmon Penh, Cambodia",
    description: "Available for local meetings",
    action: "https://maps.app.goo.gl/5wYfWFXTssnpd1Z58",
  },
  {
    icon: <WhatsApp sx={{ fontSize: 40 }} />,
    title: "WhatsApp",
    value: "(+855) 092 736 061",
    description: "Quick messages welcome",
    action: "https://wa.me/qr/4W4H4YLUXCCCB1",
  },
];

export interface Social {
  icon: JSX.Element;
  color: string;
  url: string;
}

export const social: Social[] = [
  {
    icon: <LinkedIn />,
    color: "#0077b5",
    url: "https://www.linkedin.com/in/vichet-seng-823538262/",
  },
  {
    icon: <GitHub />,
    color: "#333",
    url: "https://github.com/Vichetse",
  },
  {
    icon: <Twitter />,
    color: "#1da1f2",
    url: "https://x.com/Sengvichet2503",
  },
  {
    icon: <Telegram />,
    color: "#0088cc",
    url: "https://t.me/developer_dio",
  },
];

export const availability = [
  { day: "Monday - Friday", time: "8:00 AM - 5:00 PM PST" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM PST" },
  { day: "Sunday", time: "By appointment only" },
];
