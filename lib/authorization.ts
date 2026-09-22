import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import type { UserRole } from "@/lib/roles";

export async function requireRole(allowedRoles: readonly UserRole[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role as UserRole;

  if (!allowedRoles.includes(role)) {
    redirect("/unauthorized");
  }

  return session;
}