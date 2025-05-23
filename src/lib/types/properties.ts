// Types and Interfaces for Riviera del Este Properties

export interface PropertyFeatures {
  sala: boolean;
  comedor: boolean;
  cocina: boolean;
  bathrooms: number;
  walkInCloset?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  laundryArea: boolean;
  parkingSpaces: number;
  garden?: boolean;
  rooftop?: boolean;
}

export interface PropertyDimensions {
  totalArea: number;
  interiorArea: number;
  patioArea?: number;
  balconyArea?: number;
  rooftopArea?: number;
}

export interface PropertyPricing {
  basePrice: number;
  currency: "USD" | "DOP";
  paymentPlan: {
    reservation: number;
    contractSigning: number; // percentage
    duringConstruction: number; // percentage over 20 months
    delivery: number; // percentage
  };
}

export type PropertyCategory = "residences" | "prime";
export type PropertyType = "A" | "B" | "C" | "D" | "E";
export type FloorLevel = "1st" | "2nd" | "3rd" | "4th";

export interface Property {
  id: string;
  category: PropertyCategory;
  type: PropertyType;
  floor: FloorLevel;
  bedrooms: number;
  features: PropertyFeatures;
  dimensions: PropertyDimensions;
  pricing: PropertyPricing;
  images: string[];
  available: boolean;
  hasRooftop: boolean;
  hasPatio: boolean;
}

// Property configurations based on PDF analysis
export const PROPERTY_CONFIGURATIONS: Record<string, Partial<Property>> = {
  // RESIDENCES CATEGORY
  "residences-type-a-2bed": {
    category: "residences",
    type: "A",
    bedrooms: 2,
    dimensions: {
      totalArea: 85, // 75m² + 10m² patio
      interiorArea: 75,
      patioArea: 10,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 2,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
      garden: true,
    },
    hasPatio: true,
    hasRooftop: false,
  },

  "residences-type-b-3bed": {
    category: "residences",
    type: "B",
    bedrooms: 3,
    dimensions: {
      totalArea: 100, // 90m² + 10m² patio
      interiorArea: 90,
      patioArea: 10,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 2,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
      garden: true,
    },
    hasPatio: true,
    hasRooftop: false,
  },

  // PRIME CATEGORY
  "prime-type-c-1bed": {
    category: "prime",
    type: "C",
    bedrooms: 1,
    dimensions: {
      totalArea: 75, // includes patio
      interiorArea: 60,
      patioArea: 15,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 1.5,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
    },
    hasPatio: true,
    hasRooftop: false,
  },

  "prime-type-d-2bed": {
    category: "prime",
    type: "D",
    bedrooms: 2,
    dimensions: {
      totalArea: 95,
      interiorArea: 75,
      patioArea: 20,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 2,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
    },
    hasPatio: true,
    hasRooftop: false,
  },

  "prime-type-e-3bed": {
    category: "prime",
    type: "E",
    bedrooms: 3,
    dimensions: {
      totalArea: 115,
      interiorArea: 100,
      patioArea: 15,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 3,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
    },
    hasPatio: true,
    hasRooftop: false,
  },

  // PENTHOUSE VARIANTS
  "prime-type-c-penthouse": {
    category: "prime",
    type: "C",
    bedrooms: 2,
    dimensions: {
      totalArea: 120,
      interiorArea: 75,
      rooftopArea: 45,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 2,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
      rooftop: true,
    },
    hasPatio: false,
    hasRooftop: true,
  },

  "prime-type-d-penthouse": {
    category: "prime",
    type: "D",
    bedrooms: 3,
    dimensions: {
      totalArea: 160,
      interiorArea: 95,
      rooftopArea: 65,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 3,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
      rooftop: true,
    },
    hasPatio: false,
    hasRooftop: true,
  },

  "prime-type-e-penthouse": {
    category: "prime",
    type: "E",
    bedrooms: 3,
    dimensions: {
      totalArea: 200,
      interiorArea: 115,
      rooftopArea: 85,
    },
    features: {
      sala: true,
      comedor: true,
      cocina: true,
      bathrooms: 3,
      walkInCloset: true,
      laundryArea: true,
      parkingSpaces: 2,
      rooftop: true,
    },
    hasPatio: false,
    hasRooftop: true,
  },
};

// Pricing matrix based on PDF
export const PRICING_MATRIX: Record<string, PropertyPricing> = {
  // RESIDENCES PRICING
  "residences-a-1st": {
    basePrice: 73000,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "residences-a-2nd": {
    basePrice: 69000,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "residences-a-3rd": {
    basePrice: 67500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "residences-a-4th": {
    basePrice: 71500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "residences-b-1st": {
    basePrice: 85500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "residences-b-2nd": {
    basePrice: 81500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "residences-b-3rd": {
    basePrice: 79500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "residences-b-4th": {
    basePrice: 84000,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },

  // PRIME PRICING
  "prime-c-1st": {
    basePrice: 89500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-c-2nd": {
    basePrice: 82500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-c-3rd": {
    basePrice: 82500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-c-penthouse": {
    basePrice: 149500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-d-1st": {
    basePrice: 118500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-d-2nd": {
    basePrice: 108500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-d-3rd": {
    basePrice: 108500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-d-penthouse": {
    basePrice: 199500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-e-1st": {
    basePrice: 149500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-e-2nd": {
    basePrice: 142500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-e-3rd": {
    basePrice: 142500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
  "prime-e-penthouse": {
    basePrice: 244500,
    currency: "USD",
    paymentPlan: {
      reservation: 1000,
      contractSigning: 10,
      duringConstruction: 15,
      delivery: 75,
    },
  },
};

// Helper function to generate property ID
export const generatePropertyId = (
  category: PropertyCategory,
  type: PropertyType,
  floor: FloorLevel,
  buildingNumber?: number
): string => {
  const floorCode = floor.replace(/\D/g, "");
  const isPenthouse = floor === "4th";
  const suffix = isPenthouse ? "-ph" : "";
  return `${category}-${type.toLowerCase()}-${floorCode}${suffix}${buildingNumber ? `-bldg${buildingNumber}` : ""}`;
};

// Factory function to create property objects
export const createProperty = (
  category: PropertyCategory,
  type: PropertyType,
  floor: FloorLevel,
  buildingNumber?: number,
  customImages?: string[]
): Property => {
  const configKey = `${category}-type-${type.toLowerCase()}-${
    type === "C" || type === "D" || type === "E"
      ? floor === "4th"
        ? "penthouse"
        : `${type === "C" ? "1" : type === "D" ? "2" : "3"}bed`
      : `${type === "A" ? "2" : "3"}bed`
  }`;

  const pricingKey = `${category}-${type.toLowerCase()}-${floor === "4th" ? "penthouse" : floor.replace("st", "").replace("nd", "").replace("rd", "").replace("th", "")}`;

  const config = PROPERTY_CONFIGURATIONS[configKey];
  const pricing = PRICING_MATRIX[pricingKey];

  if (!config || !pricing) {
    throw new Error(
      `Configuration not found for ${configKey} or pricing for ${pricingKey}`
    );
  }

  return {
    id: generatePropertyId(category, type, floor, buildingNumber),
    category,
    type,
    floor,
    bedrooms: config.bedrooms!,
    features: config.features!,
    dimensions: config.dimensions!,
    pricing,
    images: customImages || [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    ],
    available: true,
    hasRooftop: config.hasRooftop!,
    hasPatio: config.hasPatio!,
  };
};

// Amenities data from PDF
export interface Amenity {
  id: string;
  nameKey: string;
  category: "recreational" | "sports" | "facilities" | "commercial";
}

export const AMENITIES: Amenity[] = [
  { id: "multi-court", nameKey: "multiUseCourt", category: "sports" },
  { id: "tennis-court", nameKey: "tennisCourt", category: "sports" },
  { id: "paddle-court", nameKey: "paddleCourt", category: "sports" },
  { id: "swimming-pool", nameKey: "swimmingPool", category: "recreational" },
  { id: "bike-path", nameKey: "bikePath", category: "recreational" },
  { id: "outdoor-gym", nameKey: "outdoorGym", category: "sports" },
  { id: "indoor-gym", nameKey: "indoorGym", category: "sports" },
  { id: "linear-parks", nameKey: "linearParks", category: "recreational" },
  { id: "gardens", nameKey: "gardens", category: "recreational" },
  { id: "kids-area", nameKey: "kidsArea", category: "recreational" },
  { id: "gazebo", nameKey: "gazebo", category: "recreational" },
  { id: "viewpoints", nameKey: "viewpoints", category: "recreational" },
  { id: "shops", nameKey: "shops", category: "commercial" },
  { id: "church", nameKey: "church", category: "facilities" },
  { id: "supermarket", nameKey: "supermarket", category: "commercial" },
];

// Project phases from PDF
export interface ProjectPhase {
  phase: number;
  name: string;
  description: string;
  buildings: number[];
  categories: PropertyCategory[];
}

export const PROJECT_PHASES: ProjectPhase[] = [
  {
    phase: 1,
    name: "Etapa 1",
    description: "Primera fase del desarrollo con edificios residenciales",
    buildings: [1, 2, 3, 4, 5],
    categories: ["residences", "prime"],
  },
  {
    phase: 2,
    name: "Etapa 2",
    description: "Segunda fase con más unidades residenciales",
    buildings: [6, 7, 8, 9],
    categories: ["residences"],
  },
  {
    phase: 3,
    name: "Etapa 3",
    description: "Fase de expansión",
    buildings: [10, 11, 12],
    categories: ["residences"],
  },
  {
    phase: 4,
    name: "Etapa 4",
    description: "Completación del proyecto residencial",
    buildings: [13, 14, 15],
    categories: ["residences"],
  },
];

export default {
  PROPERTY_CONFIGURATIONS,
  PRICING_MATRIX,
  AMENITIES,
  PROJECT_PHASES,
  createProperty,
  generatePropertyId,
};
