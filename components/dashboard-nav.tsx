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
                <Link
                  href="/users"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
                >
                  Users
                </Link>

                <Link
                  href="/customers"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
                >
                  Customers
                </Link>

                <Link
                  href="/technicians"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
                >
                  Technicians
                </Link>

                <Link
                  href="/work-orders"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
                >
                  Work Orders
                </Link>
          </>
        )}


        {role === "DISPATCHER" && (
          <>
                <Link
                  href="/customers"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
                >
                  Customers
                </Link>

                <Link
                  href="/technicians"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
                >
                  Technicians
                </Link>

                <Link
                  href="/work-orders"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
                >
                  Work Orders
                </Link>
          </>
        )}

        {role === "TECHNICIAN" && (
          <Link
            href="/my-jobs"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
          >
            My Jobs
          </Link>
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