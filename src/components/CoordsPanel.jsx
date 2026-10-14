// src/components/CoordsPanel.jsx
import { useAstroStore } from '../store/useAstroStore';
import { explainBortleSource, getBortleForCoordinates } from '../utils/bortleModel';
import {
  classifyAstronomicalZone,
  getSuitabilityColor,
} from '../utils/astronomicalZoning';

export const CoordsPanel = ({ altitud, bortleInfo }) => {
  const { coordinates } = useAstroStore();
  const activeBortleInfo = bortleInfo ?? getBortleForCoordinates(coordinates.lat, coordinates.lng);
  const zoning = classifyAstronomicalZone(activeBortleInfo.bortle);

  return (
    <section className="coords-panel">
      <div className="panel-section-title">
        <span>Análisis territorial</span>
        <span>EPSG:4326</span>
      </div>

      <div className="coords-panel-body">
        <div className="zoning-readout">
          <dl className="territorial-summary">
            <div><dt>Aptitud</dt><dd><span className="zoning-dot" style={{ backgroundColor: getSuitabilityColor(zoning.suitability) }} />{zoning.suitabilityLabel}</dd></div>
            <div><dt>Zona</dt><dd>{zoning.zoneLabel}</dd></div>
            <div><dt>Bortle</dt><dd>B{activeBortleInfo.bortle}</dd></div>
          </dl>

          <dl className="coordinate-summary">
            <div><dt>Latitud</dt><dd>{coordinates.lat.toFixed(5)}</dd></div>
            <div><dt>Longitud</dt><dd>{coordinates.lng.toFixed(5)}</dd></div>
            <div><dt>Altitud</dt><dd>{altitud ?? '—'} m</dd></div>
          </dl>

          <dl className="zoning-metadata">
            <div><dt>Fuente dominante</dt><dd>{activeBortleInfo.sourceName ?? activeBortleInfo.dominantSource ?? 'Sin fuente'}</dd></div>
            <div><dt>Confianza</dt><dd>{activeBortleInfo.confidence ?? 'No disponible'}</dd></div>
          </dl>
          <p className="zoning-method">{explainBortleSource(activeBortleInfo)}</p>
          <p className="zoning-disclaimer">Zonificación modelada por influencia lumínica basada en la escala Bortle.</p>
        </div>
      </div>
    </section>
  );
};
