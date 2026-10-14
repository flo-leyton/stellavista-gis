const ZONE_DEFINITIONS = {
  urban: {
    zoneType: 'urban',
    suitability: 'low',
    zoneLabel: 'Zona urbana',
    suitabilityLabel: 'Aptitud baja',
    color: '#ef4444',
  },
  periurban: {
    zoneType: 'periurban',
    suitability: 'medium',
    zoneLabel: 'Zona periurbana',
    suitabilityLabel: 'Aptitud media',
    color: '#f59e0b',
  },
  rural: {
    zoneType: 'rural',
    suitability: 'high',
    zoneLabel: 'Zona rural',
    suitabilityLabel: 'Aptitud alta',
    color: '#22c55e',
  },
};

const normalizeBortle = (bortle) => {
  const value = Number(bortle);
  return Number.isFinite(value) ? Math.min(9, Math.max(1, Math.round(value))) : 4;
};

/**
 * Zonificación modelada por influencia lumínica basada en la escala Bortle.
 * No representa una clasificación oficial de uso del suelo.
 */
export const classifyAstronomicalZone = (bortle) => {
  const value = normalizeBortle(bortle);
  if (value >= 7) return { ...ZONE_DEFINITIONS.urban };
  if (value >= 5) return { ...ZONE_DEFINITIONS.periurban };
  return { ...ZONE_DEFINITIONS.rural };
};

export const getZoneLabel = (zoneType) =>
  ZONE_DEFINITIONS[zoneType]?.zoneLabel ?? 'Zona sin clasificar';

export const getSuitabilityLabel = (suitability) =>
  Object.values(ZONE_DEFINITIONS).find(
    (definition) => definition.suitability === suitability
  )?.suitabilityLabel ?? 'Aptitud sin clasificar';

export const getSuitabilityColor = (suitability) =>
  Object.values(ZONE_DEFINITIONS).find(
    (definition) => definition.suitability === suitability
  )?.color ?? '#64748b';

export const addAstronomicalZoningToGeoJSON = (geojson) => ({
  ...geojson,
  features: geojson.features.map((feature) => {
    const zoning = classifyAstronomicalZone(feature.properties?.bortle);
    return {
      ...feature,
      properties: {
        ...feature.properties,
        ...zoning,
        zoningMethod: 'bortle-light-influence-model',
        zoningDescription:
          'Zonificación modelada por influencia lumínica basada en la escala Bortle.',
      },
    };
  }),
});
