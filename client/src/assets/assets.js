import logo from "./logo.png";
import green_logo from "./logo_green.png";
import upload_area from "./upload_area.png"

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
  upload_area
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
    path: "syn/shop-l ist",
    bg: { from: "#3588F2", to: "#0BB0D7" },
  },
];

export const navItmes = [
  { to: "/syn", label: "Dashboard", Icon: House },
  { to: "/syn/task-management", label: "Task-Management", Icon: ListChecks },
  { to: "/syn/bill-splitting", label: "Bill & Expenses", Icon: DollarSign },
  { to: "/syn/group-chat", label: "Group Chat", Icon: MessageCircle },
  { to: "/syn/shop-list", label: "Shop List", Icon: ShoppingCart },
];


import { 
  Calendar, 
  Flag, 
  User, 
  Utensils, 
  Flower,
  Home,
  FileText,
  Users,
  CalendarDays
} from 'lucide-react';

export const tasksData = [
  {
    id: 1,
    title: "Clean the kitchen",
    priority: "high",
    priorityIcon: "Flag",
    description: "Wash dishes, wipe counters, and mop floor",
    assignee: "Sarah Miller",
    assigneeIcon: "User",
    dueDate: "2023-06-15",
    dueDateIcon: "Calendar",
    category: "kitchen",
    categoryIcon: "Utensils",
    status: "pending"
  },
  {
    id: 2,
    title: "Buy groceries",
    priority: "medium",
    priorityIcon: "Flag",
    description: "Milk, eggs, bread, fruits, and vegetables",
    assignee: "Alex Johnson",
    assigneeIcon: "User",
    dueDate: "2023-06-18",
    dueDateIcon: "Calendar",
    category: "shopping",
    categoryIcon: "ShoppingCart",
    status: "pending"
  },
  {
    id: 3,
    title: "Water the plants",
    priority: "normal",
    priorityIcon: "Flag",
    description: "All indoor plants in the living room and balcony",
    assignee: "Sarah Miller",
    assigneeIcon: "User",
    dueDate: "2023-06-14",
    dueDateIcon: "Calendar",
    category: "home",
    categoryIcon: "Home",
    status: "pending"
  }
];

export const statsData = {
  welcomeMessage: "Welcome back, Alex Johnson!",
  tasksToComplete: 1,
  quickStats: [
    {
      name: "Tasks",
      count: 3,
      icon: FileText,
      color: "text-blue-800",
      bg: "bg-blue-100",
    },
    {
      name: "Members",
      count: 2,
      icon: Users,
      color:"text-purple-800",
      bg:"bg-purple-100",
    },
    {
      name: "Events",
      count: 2,
      icon: CalendarDays,
      color:"text-green-800",
      bg:"bg-green-100"
    },
    {
      name: "Bills",
      count: 3,
      icon: DollarSign,
      color: "text-orange-800", 
      bg: "bg-orange-100", 
    },
  ]
};

export const categoriesData = [
  {
    name: "In the kitchen",
    tasks: [1], // references task id 1
    dueDate: "2023-06-15",
    priority: "high"
  },
  {
    name: "Groceries",
    tasks: [2], // references task id 2
    dueDate: "2023-06-18",
    priority: "medium"
  }
];

// Helper function to get priority color
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'normal':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
};

// Helper function to get priority background color
export const getPriorityBgColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 dark:bg-red-900/20';
    case 'medium':
      return 'bg-yellow-100 dark:bg-yellow-900/20';
    case 'normal':
      return 'bg-blue-100 dark:bg-blue-900/20';
    default:
      return 'bg-gray-100 dark:bg-gray-900/20';
  }
};