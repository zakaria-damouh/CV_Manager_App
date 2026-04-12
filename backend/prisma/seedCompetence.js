import { PrismaClient } from "@prisma/client";

// prisma/seedCompetence.js
const prisma = new PrismaClient();

async function main() {
  const competences = [
    { name: 'JavaScript', category: 'Programmation' },
    { name: 'TypeScript', category: 'Programmation' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'React', category: 'Frontend' },
    { name: 'PostgreSQL', category: 'Base de données' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Git', category: 'Outils' },
    { name: 'REST API', category: 'Backend' },
    { name: 'Prisma', category: 'ORM' },
    { name: 'Tailwind CSS', category: 'Frontend' },
  ];

  for (const competence of competences) {
    await prisma.competence.upsert({
      where: { name: competence.name },
      update: {},
      create: competence,
    });
  }

  console.log('✅ Competences seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });