import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            FieldFlow Dashboard
          </h1>

          <p className="mt-4 text-gray-600">
            Welcome, {session.user.name}.
          </p>

          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {session.user.email}
            </p>

            <p className="mt-2">
              <span className="font-semibold">Role:</span>{" "}
              {session.user.role}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}