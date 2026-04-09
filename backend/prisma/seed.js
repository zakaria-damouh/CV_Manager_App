import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const hashedPassword = await bcrypt.hash("Test@1233", 10);

async function main() {
  // 1. Create Competences (important because used later)
  const js = await prisma.competence.create({
    data: {
      name: "JavaScript",
      category: "Programming",
    },
  });

  const react = await prisma.competence.create({
    data: {
      name: "React",
      category: "Frontend",
    },
  });

  // 2. Create User with nested relations
  const user = await prisma.user.create({
    data: {
      firstName: "Zakaria",
      lastName: "Damouh",
      email: "zakaria@example.com",
      password: hashedPassword,

      profile: {
        create: {
          professionalTitle: "Full Stack Developer",
          summary: "Passionate developer",
          contact: "0600000000",
          externalLinks: "linkedin.com/zakaria",
        },
      },

      langues: {
        create: [
          { name: "English", level: "Intermediate" },
          { name: "French", level: "Basic" },
          { name: "Arabic", level: "Native" },
        ],
      },

formations: {
  create: [
    {
      institution: "University Hassan II",
      degree: "Bachelor",
      specialty: "Computer Science",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2023-01-01"),
      description: "Study in Computer Science",
    },
    {
      institution: "Online Platform",
      degree: "Certification",
      specialty: "Web Development",
      startDate: new Date("2023-02-01"),
      endDate: new Date("2023-06-01"),
      description: "Full stack web development training",
    },
    {
      institution: "Bootcamp",
      degree: "Diploma",
      specialty: "React & Node.js",
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-10-01"),
      description: "Intensive frontend and backend training",
    },
  ],
},

      experiences: {
  create: [
    {
      position: "Frontend Developer",
      company: "IT Company",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-06-01"),
      description: "Worked on UI with React",
      order: 1,
    },
    {
      position: "Intern Developer",
      company: "Startup",
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-09-01"),
      description: "Built small features and fixed bugs",
      order: 2,
    },
    {
      position: "Freelance Developer",
      company: "Self-employed",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2024-01-01"),
      description: "Created websites for clients",
      order: 3,
    },
  ],
},

      offres: {
        create: [
          {
            title: "Frontend Developer",
            company: "Startup",
            description: "Looking for React dev",
          },
        ],
      },

      documents: {
        create: [
          {
            type: "CV",
            content: "Generated CV content",
            aiModelUsed: "GPT",
          },
        ],
      },
    },
  });

  // 3. Add UserCompetences
  await prisma.userCompetence.createMany({
    data: [
      {
        userId: user.id,
        competenceId: js.id,
        level: "Advanced",
      },
      {
        userId: user.id,
        competenceId: react.id,
        level: "Intermediate",
      },
    ],
  });

  console.log(" Seeding finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });