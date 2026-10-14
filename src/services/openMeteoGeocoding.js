export const GEOCODING_ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search';
export const GEOCODING_COUNTRY = 'BO';
export const GEOCODING_RESULT_LIMIT = 8;

export const searchLocations = async (
  query,
  { signal, countryCode = GEOCODING_COUNTRY } = {},
) => {
  const params = new URLSearchParams({
    name: query,
    count: String(GEOCODING_RESULT_LIMIT),
    language: 'es',
    format: 'json',
  });

  if (countryCode) params.set('countryCode', countryCode);

  const response = await fetch(`${GEOCODING_ENDPOINT}?${params}`, { signal });

  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.results)
    ? payload.results.slice(0, GEOCODING_RESULT_LIMIT)
    : [];
};

export const parseCoordinateQuery = (query) => {
  const match = query.trim().match(/^([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)$/);
  if (!match) return null;

  const lat = Number(match[1]);
  const lng = Number(match[2]);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
};
