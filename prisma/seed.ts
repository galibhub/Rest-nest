import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

import {
  Role,
  UserStatus,
  PropertyAvailability,
  RentalRequestStatus,
} from "../prisma/generated/prisma/client";

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("123456", 10);

  // ==========================
// Categories
// ==========================

const apartment = await prisma.category.upsert({
  where: {
    name: "Apartment",
  },
  update: {},
  create: {
    name: "Apartment",
    description: "Modern apartments",
  },
});

const house = await prisma.category.upsert({
  where: {
    name: "House",
  },
  update: {},
  create: {
    name: "House",
    description: "Family houses",
  },
});

const villa = await prisma.category.upsert({
  where: {
    name: "Villa",
  },
  update: {},
  create: {
    name: "Villa",
    description: "Luxury villas",
  },
});

const studio = await prisma.category.upsert({
  where: {
    name: "Studio",
  },
  update: {},
  create: {
    name: "Studio",
    description: "Studio apartments",
  },
});

const office = await prisma.category.upsert({
  where: {
    name: "Office",
  },
  update: {},
  create: {
    name: "Office",
    description: "Office spaces",
  },
});

const commercial = await prisma.category.upsert({
  where: {
    name: "Commercial",
  },
  update: {},
  create: {
    name: "Commercial",
    description: "Commercial properties",
  },
});

console.log("✅ Categories Seeded");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });