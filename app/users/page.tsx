import Link from "next/link";

import { requireRole } from "@/lib/authorization";

export default async function UsersPage() {
  const session = await requireRole(["ADMIN"]);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Users
        </h1>

        <p className="mt-4 text-gray-600">
          Admin-only user management workspace.
        </p>

        <p className="mt-4">
          Signed in as:{" "}
          <span className="font-semibold">{session.user.email}</span>
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm font-medium text-gray-700 underline"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}