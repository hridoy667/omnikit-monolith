/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



async function main() {
  
  console.log('🚀 Syncing Districts...');


}
main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });