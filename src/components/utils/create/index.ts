import { createBEM } from './bem';

export function createNamespace(name: string) {
  const prefixedName = `pant-${name}`;
  return [
    prefixedName,
    createBEM(prefixedName)
  ] as const;
}
