export const UNITS = {
  KG: "kg",
  G: "g",
  PZA: "pza",
  ATADO: "atado",
  CAJA: "caja",
} as const;

export type Unit = (typeof UNITS)[keyof typeof UNITS];

export const UNIT_LABELS: Record<Unit, string> = {
  [UNITS.KG]: "Kilogramo",
  [UNITS.G]: "Gramo",
  [UNITS.PZA]: "Pieza",
  [UNITS.ATADO]: "Atado",
  [UNITS.CAJA]: "Caja",
};
