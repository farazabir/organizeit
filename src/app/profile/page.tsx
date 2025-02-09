"use client";

import React from "react";
import { useAuthStore } from "../../stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/protectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {user ? (
            <Card className="w-full shadow-xl dark:border-gray-800 dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="border-b dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xl bg-blue-100 dark:bg-blue-900">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {user.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Registered since{" "}
                        {format(new Date(user.createdAt), "MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={user.active ? "default" : "secondary"}
                    className="text-sm"
                  >
                    {user.active ? "Active" : "Inactive"} Account
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email Address
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {user.email}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Account Status
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {user.active ? "Verified" : "Pending Verification"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Created At
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {format(new Date(user.createdAt), "PPpp")}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Last Updated
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {format(new Date(user.updatedAt), "PPpp")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <Button variant="outline" className="dark:border-gray-600">
                    Edit Profile
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-xl">
                Loading profile...
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
