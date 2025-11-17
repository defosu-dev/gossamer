'use client';
import React from 'react';
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
} from 'lucide-react';
import { FaqCard } from './FaqCard';
import { Category } from '../../common/Category';
import { Accordion } from '../../common/Accordion';

const FaqPage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl items-center">
      {/* Top section */}
      <div className="relative flex h-64 flex-col justify-end bg-gray-300 pb-6 pl-10">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white">
          <p className="mb-2 text-sm">Need Help ?</p>
          <h1 className="text-3xl font-semibold">Frequently asked Questions</h1>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase">General Questions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FaqCard
              icon={<User className="h-6 w-6 text-gray-700" />}
              title="How to Register & Login"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<Lock className="h-6 w-6 text-gray-700" />}
              title="Login Constraints"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<Settings className="h-6 w-6 text-gray-700" />}
              title="Set Up Account"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
          </div>
        </div>

        {/* Sales Support */}
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase">Sales Support</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FaqCard
              icon={<Users className="h-6 w-6 text-gray-700" />}
              title="How to Manage My Employee"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<DollarSign className="h-6 w-6 text-gray-700" />}
              title="How does back pricing work?"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
            <FaqCard
              icon={<Bell className="h-6 w-6 text-gray-700" />}
              title="Notify Stuffus Admin"
              text="Registering for a Stuffus account is even easier with a choice of various ways..."
            />
          </div>
        </div>

        {/* Category FAQ */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left side - Categories */}
          <div className="space-y-4">
            <Category
              title="Shipping"
              sub={[
                { label: 'For Home', icon: <Home className="h-4 w-4" /> },
                { label: 'For Music', icon: <Music className="h-4 w-4" /> },
                { label: 'For Phone', icon: <Phone className="h-4 w-4" /> },
                { label: 'For Storage', icon: <Archive className="h-4 w-4" /> },
              ]}
            />
            <Category
              title="Complain Order"
              sub={[{ label: 'Damaged' }, { label: 'Wrong Item' }]}
            />
            <Category title="Sales Support" sub={[{ label: 'Discounts' }, { label: 'Coupons' }]} />
            <Category
              title="Promotions"
              sub={[{ label: 'Black Friday' }, { label: 'Season Sale' }]}
            />
          </div>

          {/* Right side - Accordion */}
          <div className="space-y-4 md:col-span-2">
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
