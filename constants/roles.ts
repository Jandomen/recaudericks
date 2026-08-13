export const ROLES = {
  ADMIN: "admin",
  CAJERO: "cajero",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.ADMIN]: "Administrador",
  [ROLES.CAJERO]: "Cajero",
};
