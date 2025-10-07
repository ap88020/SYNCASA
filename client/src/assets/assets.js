import logo from './logo.png'
import { ListChecks, DollarSign, MessageCircle, ShoppingCart } from "lucide-react";

export const assets = {
    logo,
}

export const features = [
  {
    id: 1,
    title: "Task Management",
    description: "Assign and track household chores with priority levels and due dates.",
    icon: ListChecks,
    color: "text-green-600",
    path: "syn/task-management",   // 👈 add this
  },
  {
    id: 2,
    title: "Bill Splitting",
    description: "Split household bills fairly and track payments with ease.",
    icon: DollarSign,
    color: "text-orange-500",
    path: "syn/bill-splitting",   // 👈 add this
  },
  {
    id: 3,
    title: "Group Chat",
    description: "Stay connected with your flatmates through real-time messaging.",
    icon: MessageCircle,
    color: "text-green-500",
    path: "syn/group-chat",    // 👈 add this
  },
  {
    id: 4,
    title: "Shopping Lists",
    description: "Shared shopping lists to keep track of household needs.",
    icon: ShoppingCart,
    color: "text-yellow-500",
    path: "syn/shop-list", // 👈 add this
  },
];
