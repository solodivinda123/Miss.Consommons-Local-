import { CSSProperties } from "react";

export interface CropData {
  x: number; // percentage (0 to 100)
  y: number; // percentage (0 to 100)
  scale: number; // zoom factor (1 to 10)
}

// 24 unique default coordinate crops across the group image so that every candidate starts with a different face
export const CANDIDATE_CROP_DEFAULTS: Record<string, CropData> = {
  gombe: { x: 12, y: 35, scale: 5.2 },
  ngaliema: { x: 24, y: 35, scale: 5.2 },
  limete: { x: 36, y: 35, scale: 5.2 },
  bandalungwa: { x: 48, y: 35, scale: 5.2 },
  kasavubu: { x: 60, y: 35, scale: 5.2 },
  kintambo: { x: 72, y: 35, scale: 5.2 },
  lemba: { x: 84, y: 35, scale: 5.2 },
  matete: { x: 95, y: 35, scale: 5.2 },

  masina: { x: 8, y: 55, scale: 5.2 },
  ndjili: { x: 20, y: 55, scale: 5.2 },
  nsele: { x: 32, y: 55, scale: 5.2 },
  maluku: { x: 44, y: 55, scale: 5.2 },
  kimbanseke: { x: 56, y: 55, scale: 5.2 },
  barumbu: { x: 68, y: 55, scale: 5.2 },
  kinshasa: { x: 80, y: 55, scale: 5.2 },
  lingwala: { x: 92, y: 55, scale: 5.2 },

  bumbu: { x: 14, y: 75, scale: 5.2 },
  kalamu: { x: 26, y: 75, scale: 5.2 },
  kisenso: { x: 38, y: 75, scale: 5.2 },
  makala: { x: 50, y: 75, scale: 5.2 },
  ngaba: { x: 62, y: 75, scale: 5.2 },
  ngiringiri: { x: 74, y: 75, scale: 5.2 },
  selembao: { x: 86, y: 75, scale: 5.2 },
  montngafula: { x: 95, y: 75, scale: 5.2 }
};

const STORAGE_KEY = "active_candidate_crops_v2";

export function loadSavedCrops(): Record<string, CropData> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that it has all necessary keys
      if (typeof parsed === "object" && parsed !== null) {
        return { ...CANDIDATE_CROP_DEFAULTS, ...parsed };
      }
    }
  } catch (e) {
    console.error("Error loading saved crops:", e);
  }
  return { ...CANDIDATE_CROP_DEFAULTS };
}

export function saveCrops(crops: Record<string, CropData>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(crops));
  } catch (e) {
    console.error("Error saving crops:", e);
  }
}

/**
 * Returns CSS styles to zoom and focus on a specific face inside a 100% size container
 */
export function getCandidateCropStyle(
  communeId: string,
  crops: Record<string, CropData>,
  isZoomedOut = false
): CSSProperties {
  const crop = crops[communeId] || CANDIDATE_CROP_DEFAULTS[communeId] || { x: 50, y: 50, scale: 1 };
  
  if (isZoomedOut) {
    return {
      transform: "scale(1)",
      transformOrigin: "center center",
      transition: "transform 0.4s ease, transform-origin 0.4s ease",
    };
  }

  return {
    transform: `scale(${crop.scale})`,
    transformOrigin: `${crop.x}% ${crop.y}%`,
    transition: "transform 0.3s ease, transform-origin 0.3s ease",
  };
}
