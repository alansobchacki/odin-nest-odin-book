"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authStateAtom } from "../../state/authState";
import { useGetCurrentUserDetails } from "../../hooks/userService/useGetCurrentUserDetails";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [authState, setAuthState] = useAtom(authStateAtom);
  const { data: currentUserData } = useGetCurrentUserDetails();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({ id: "", isAuthenticated: false });

    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <aside className="flex flex-col justify-between w-64 bg-gray-800 text-white p-4 sticky top-0 h-screen">
          <div className="flex flex-col gap-4 pl-[20px]">
            <ul>
              <Link href={`/dashboard/users/profile?id=${currentUserData?.id}`}>
                Hello, {currentUserData?.name}
              </Link>
              <Link href="/dashboard">
                <li>Timeline</li>
              </Link>
              <Link href="/dashboard/network">
                <li>Connections</li>
              </Link>
              <Link href="/dashboard/trending-users">
                <li>Trending Users</li>
              </Link>
            </ul>
          </div>

          <div className="pl-[20px]">
            {/* Add a settings page later for users to update their account settings
            <Link href="/dashboard/settings">
              <p>Settings</p>
            </Link>
            */}
            <button onClick={() => setIsLoggingOut(true)}>Logout</button>
          </div>
        </aside>

        <main className="flex-1 p-6 items-center overflow-auto">{children}</main>

        {isLoggingOut && (
          <>
            <p>Do you really wish to logout?</p>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={() => setIsLoggingOut(false)}>No</button>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
