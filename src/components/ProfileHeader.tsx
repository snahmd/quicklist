import { Info, Shield, User, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useUserContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function ProfileHeader({ avatarUrl }: { avatarUrl: string }) {
  return (
    <Card className="mb-6 bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar and Main Info */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={avatarUrl!}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">Ahmed</h1>
                <button className="text-[#447604]">
                  <Info className="w-5 h-5" />
                  <span className="sr-only">Info</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure payment set up</span>
                <button className="text-[#447604]">
                  <Info className="w-4 h-4" />
                  <span className="sr-only">Info</span>
                </button>
              </div>
              <p className="text-sm text-gray-600">0 ads online / 67 total</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 pt-4 md:pt-0">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-500" />
              <span>Private User</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-gray-500" />
              <span>Active since 14.04.2019</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>Usually responds within 3 hours</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span>1 Follower</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
