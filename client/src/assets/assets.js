import logo from "./logo.png";
import green_logo from "./logo_green.png";
import {
  ListChecks,
  DollarSign,
  MessageCircle,
  ShoppingCart,
  House
} from "lucide-react";

export const assets = {
  logo,
  green_logo,
};

export const features = [
  {
    id: 1,
    title: "Task Management",
    description:
      "Assign and track household chores with priority levels and due dates.",
    icon: ListChecks,
    color: "text-black dark:text-white",
    path: "syn/task-management",
    bg: { from: "#12B7AC", to: "#08B6CE" },
  },
  {
    id: 2,
    title: "Bill Splitting",
    description: "Split household bills fairly and track payments with ease.",
    icon: DollarSign,
    color: "text-orange-500",
    path: "syn/bill-splitting", 
    bg: { from: "#20C363", to: "#11B97E" },
  },
  {
    id: 3,
    title: "Group Chat",
    description:
      "Stay connected with your flatmates through real-time messaging.",
    icon: MessageCircle,
    color: "text-white",
    path: "syn/group-chat", 
    bg: { from: "#B153EA", to: "#E549A3" },
  },
  {
    id: 4,
    title: "Shopping Lists",
    description: "Shared shopping lists to keep track of household needs.",
    icon: ShoppingCart,
    color: "text-yellow-500",
    path: "syn/shop-list",
    bg: { from: "#3588F2", to: "#0BB0D7" },
  },
];

export const navItmes = [
  { to: "/syn", label: "Dashboard", Icon: House },
  { to: "/syn/task-management", label: "Task-Management", Icon: ListChecks },
  { to: "/syn/bill-splitting", label: "Bill Splitting", Icon: DollarSign },
  { to: "/syn/group-chat", label: "Group Chat", Icon: MessageCircle },
  { to: "/syn/shop-list", label: "Shop List", Icon: ShoppingCart },
];
