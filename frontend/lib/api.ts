const API_BASE_URL = "http://localhost:8000/api/v1";

export const getHealthCheck = async () => {
  const response = await fetch("http://localhost:8000/");
  if (!response.ok) {
    throw new Error("API is not healthy");
  }
  return response.json();
};

export const getLocationDetails = async (lat: number, lon: number) => {
  const response = await fetch(`${API_BASE_URL}/location/details?lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    throw new Error("Failed to fetch location details");
  }
  return response.json();
};

export const predictYield = async (data: {
  latitude: number;
  longitude: number;
  crop: string;
  season: string;
  area_hectares: number;
}) => {
  const response = await fetch(`${API_BASE_URL}/yield/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to predict yield");
  }
  return response.json();
};

export const recommendFertilizer = async (data: {
  latitude: number;
  longitude: number;
  crop_type: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/fertilizer/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to recommend fertilizer");
  }
  return response.json();
};

export const recommendCrop = async (data: {
  latitude: number;
  longitude: number;
}) => {
  const response = await fetch(`${API_BASE_URL}/crop/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to recommend crop");
  }
  return response.json();
};
