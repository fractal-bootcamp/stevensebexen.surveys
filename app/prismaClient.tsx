import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// console.log(prisma.)

// async function main() {
//   await prisma.survey.create({
//     data: {
//       name: 'x'
//     }
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//   })