import "dotenv/config";

import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

type DemoUser = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "DISPATCHER" | "TECHNICIAN";
};

const demoUsers: DemoUser[] = [
  {
    name: "FieldFlow Admin",
    email: "admin@fieldflow.test",
    password: "AdminDemo2026!",
    role: "ADMIN",
  },
  {
    name: "FieldFlow Dispatcher",
    email: "dispatch@fieldflow.test",
    password: "DispatchDemo2026!",
    role: "DISPATCHER",
  },
  {
    name: "FieldFlow Technician",
    email: "tech@fieldflow.test",
    password: "TechDemo2026!",
    role: "TECHNICIAN",
  },
];

async function ensureDemoUser(demoUser: DemoUser) {
  let user = await prisma.user.findUnique({
    where: {
      email: demoUser.email,
    },
  });

  if (!user) {
    await auth.api.signUpEmail({
      body: {
        name: demoUser.name,
        email: demoUser.email,
        password: demoUser.password,
      },
    });

    console.log(`Created user: ${demoUser.email}`);

    // Fetch the newly created user through Prisma so that
    // the returned object has the exact Prisma User type.
    user = await prisma.user.findUnique({
      where: {
        email: demoUser.email,
      },
    });

    if (!user) {
      throw new Error(
        `User was created by Better Auth but could not be found: ${demoUser.email}`,
      );
    }
  } else {
    console.log(`User already exists: ${demoUser.email}`);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: demoUser.role,
    },
  });

  return updatedUser;
}

async function main() {
  console.log("Starting FieldFlow demo seed...");

  const admin = await ensureDemoUser(demoUsers[0]);
  const dispatcher = await ensureDemoUser(demoUsers[1]);
  const technicianUser = await ensureDemoUser(demoUsers[2]);

  await prisma.technician.upsert({
    where: {
      userId: technicianUser.id,
    },
    update: {
      phone: "0710000000",
      skills: ["Networking", "CCTV"],
      status: "AVAILABLE",
    },
    create: {
      userId: technicianUser.id,
      phone: "0710000000",
      skills: ["Networking", "CCTV"],
      status: "AVAILABLE",
    },
  });

  console.log("");
  console.log("FieldFlow demo users are ready:");
  console.log(`Admin: ${admin.email}`);
  console.log(`Dispatcher: ${dispatcher.email}`);
  console.log(`Technician: ${technicianUser.email}`);
  console.log("");
  console.log("Demo seed completed.");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });