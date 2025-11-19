import { PersistentManager } from './persistent-manager';

/**
 * Transaction decorator
 * 
 * @returns 
 */
export const Transactional = (pm: PersistentManager): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      return pm.$transaction(async (prisma) => {
        return originalMethod.apply(this, args);
      });
    };
    return descriptor;
  };
};