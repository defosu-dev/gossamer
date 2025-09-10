"use client";
import React from "react";
import {
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
import { FaqCard } from "./FaqCard";
import { Category } from "./Category";
import { Accordion } from "./Accordion";

const FaqPage = () => {
  return (
    <div className="w-full max-w-6xl items-center mx-auto">
      {/* Top section */}
      <div className="relative h-64 bg-gray-300 flex flex-col justify-end pb-6 pl-10">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white">
          <p className=" text-sm mb-2">Need Help ?</p>
          <h1 className="text-3xl font-semibold">Frequently asked Questions</h1>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-6xl py-12 px-4 space-y-12">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-6 uppercase">
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
          <h2 className="text-sm font-semibold text-gray-800 mb-6 uppercase">
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
            <Category
              title="Complain Order"
              sub={[{ label: "Damaged" }, { label: "Wrong Item" }]}
            />
            <Category
              title="Sales Support"
              sub={[{ label: "Discounts" }, { label: "Coupons" }]}
            />
            <Category
              title="Promotions"
              sub={[{ label: "Black Friday" }, { label: "Season Sale" }]}
            />
          </div>

          {/* Right side - Accordion */}
          <div className="md:col-span-2 space-y-4">
            <Accordion
              title="Terms and Conditions of Application Service Fee"
              answer="Our service fee is applied based on the selected plan and will be billed monthly."
            />
            <Accordion
              title="I haven't received my order yet"
              answer="Please check the tracking link in your account. If the order still hasn’t arrived, contact support."
            />
            <Accordion
              title="How to Cancel an Order on Stuffus"
              answer="Navigate to your orders, select the order, and click cancel. Refund will be processed automatically."
            />
            <Accordion
              title="Delivery status on Stuffus is not updated"
              answer="Tracking info might be delayed. If it doesn’t update for 48h, contact the courier directly."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
