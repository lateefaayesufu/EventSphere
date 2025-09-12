import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  rl.question('Are you sure you want to delete all users? This action cannot be undone. (yes/no): ', async (answer) => {
    if (answer.toLowerCase() === 'yes') {
      try {
        await prisma.user.deleteMany({});
        console.log('All users have been deleted.');
      } catch (error) {
        console.error('Error deleting users:', error);
      } finally {
        await prisma.$disconnect();
      }
    }
    rl.close();
  });
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
