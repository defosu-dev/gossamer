"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  User,
  Lock,
  Settings,
  Users,
  DollarSign,
  Bell,
  Home,
  Music,
  Phone,
  Archive,
} from "lucide-react";

const FaqPage = () => {
  return (
    <div className="w-full max-w-6xl items-center mx-auto">
      {/* Hero Section */}
      <div className="relative h-64 bg-gray-300 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white">
          <p className="uppercase text-sm mb-2">Need Help ?</p>
          <h1 className="text-3xl font-bold">Frequently asked Questions</h1>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-6xl py-12 px-4 space-y-12">
        {/* General Questions */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-6 uppercase">
            General Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FaqCard
              icon={<User className="w-6 h-6 text-gray-700" />}
              title="How to Register & Login"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<Lock className="w-6 h-6 text-gray-700" />}
              title="Login Constraints"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<Settings className="w-6 h-6 text-gray-700" />}
              title="Set Up Account"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
          </div>
        </div>

        {/* Sales Support */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-6 uppercase">
            Sales Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FaqCard
              icon={<Users className="w-6 h-6 text-gray-700" />}
              title="How to Manage My Employee"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<DollarSign className="w-6 h-6 text-gray-700" />}
              title="How does back pricing work?"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<Bell className="w-6 h-6 text-gray-700" />}
              title="Notify Stuffus Admin"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
          </div>
        </div>

        {/* Category FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side - Categories */}
          <div className="space-y-4">
            <Category
              title="Shipping"
              sub={[
                { label: "For Home", icon: <Home className="w-4 h-4" /> },
                { label: "For Music", icon: <Music className="w-4 h-4" /> },
                { label: "For Phone", icon: <Phone className="w-4 h-4" /> },
                { label: "For Storage", icon: <Archive className="w-4 h-4" /> },
              ]}
            />
            <Category title="Complain Order" />
            <Category title="Sales Support" />
            <Category title="Promotions" />
          </div>

          {/* Right side - Accordion */}
          <div className="md:col-span-2 space-y-4">
            <Accordion title="Terms and Conditions of Application Service Fee" />
            <Accordion title="I haven't received my order yet" />
            <Accordion title="How to Cancel an Order on Stuffus" />
            <Accordion title="Delivery status on Stuffus is not updated" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;

const FaqCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="p-6 rounded-xl shadow-sm bg-white">
    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md mb-4">
      {icon}
    </div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);

const Category = ({
  title,
  sub,
}: {
  title: string;
  sub?: { label: string; icon: React.ReactNode }[];
}) => (
  <div className="rounded-lg p-4 bg-white shadow-sm">
    <p className="font-medium mb-2">{title}</p>
    {sub && (
      <ul className="ml-2 text-sm text-gray-600 space-y-2">
        {sub.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            {s.icon}
            {s.label}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Accordion = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600">
          Здесь можно вставить текст ответа.
        </div>
      )}
    </div>
  );
};
