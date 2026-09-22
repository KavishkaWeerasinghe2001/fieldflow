"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type UserRole = "ADMIN" | "DISPATCHER" | "TECHNICIAN";

type DashboardNavProps = {
  role: UserRole;
};

export function DashboardNav({ role }: DashboardNavProps) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <nav className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Dashboard
        </Link>

        {role === "ADMIN" && (
          <>
            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
              Users
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
              Customers
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
              Technicians
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
              Work Orders
            </span>
          </>
        )}

        {role === "DISPATCHER" && (
          <>
            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
              Customers
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
              Technicians
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
              Work Orders
            </span>
          </>
        )}

        {role === "TECHNICIAN" && (
          <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm">
            My Jobs
          </span>
        )}

        <button
          type="button"
          onClick={handleSignOut}
          className="ml-auto rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}