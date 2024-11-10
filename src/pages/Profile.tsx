import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Eye,
  Info,
  Lock,
  Mail,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DeliveryAddressSection } from "@/components/DeliveryAddressSection";
import ProfileHeader from "@/components/ProfileHeader";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: <User className="w-4 h-4" />,
    label: "Profile Information",
    href: "#profile",
  },
  {
    icon: <Settings className="w-4 h-4" />,
    label: "Account Settings",
    href: "#account",
  },
];

interface AccountSettingRowProps {
  label: string;
  value: string;
  action?: string;
  className?: string;
}

function AccountSettingRow({
  label,
  value,
  action = "Change",
  className = "",
}: AccountSettingRowProps) {
  return (
    <div className={`flex items-center justify-between py-4 ${className}`}>
      <div className="space-y-0.5">
        <h3 className="text-base font-medium text-gray-900">{label}</h3>
        <p className="text-[15px] text-gray-600">{value}</p>
      </div>
      <Button
        variant="ghost"
        className="text-[#447604] hover:text-[#447604] hover:bg-gray-100"
      >
        {action}
      </Button>
    </div>
  );
}

function AccountSettingsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-gray-600">
        <Eye className="h-5 w-5" />
        <p>All information is visible only to you</p>
      </div>

      <div className="space-y-4 rounded-lg bg-gray-50 p-4">
        <AccountSettingRow
          label="Verified Phone Number"
          value="+49*******426"
        />

        <Separator />

        <AccountSettingRow label="Email Address" value="info@ahmedsan.com" />

        <Separator />

        <AccountSettingRow label="Change Password" value="***********" />

        <Separator />

        <div className="py-4">
          <h3 className="text-base font-medium text-gray-900">Your Activity</h3>
          <div className="mt-1 space-y-1">
            <p className="text-[15px] text-gray-600">
              You currently have 0 ads online.
            </p>
            <p className="text-[15px] text-gray-600">
              You have posted 0 ads in the last 30 days.
            </p>
          </div>
        </div>

        <Separator />

        <AccountSettingRow label="Billing Address" value="" action="Edit" />
      </div>

      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default function Profile() {
  const [profileName, setProfileName] = useState("Ahmed");
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <ProfileHeader />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeSection === item.href.slice(1) ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setActiveSection(item.href.slice(1))}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your profile information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeSection === "profile" && (
                    <>
                      {/* Profile Information */}
                      <div>
                        <h3 className="text-lg font-medium">
                          Profile Information
                        </h3>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-end gap-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Profile Name
                              </label>
                              <Input
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button>Save</Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address Section */}
                      <DeliveryAddressSection />
                    </>
                  )}

                  {/* Account Settings Section */}
                  {activeSection === "account" && <AccountSettingsSection />}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
