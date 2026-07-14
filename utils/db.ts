import { PrismaClient } from "@prisma/client"; 

const prismaClientSingleton = () => {
    try {
        return new PrismaClient({
            log: ['query', 'error', 'warn'],
        });
    } catch (error) {
        console.error('Error initializing Prisma:', error);
        throw error;
    }
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
}

let prisma: PrismaClientSingleton;

try {
    prisma = globalForPrisma.prisma ?? prismaClientSingleton();
} catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    throw error;
}


export default prisma;

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;