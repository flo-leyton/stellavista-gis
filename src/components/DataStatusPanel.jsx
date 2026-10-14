import { Database, Map, MoonStar, Satellite } from 'lucide-react';
import { PanelShell } from './PanelShell';

const DATA_SOURCES = [
  { category: 'Meteorología', source: 'Open-Meteo', status: 'Externo', icon: <Satellite aria-hidden="true" /> },
  { category: 'Astronomía', source: 'Astronomy Engine / SunCalc', status: 'Local', icon: <MoonStar aria-hidden="true" /> },
  { category: 'Mapa', source: 'MapLibre / MapTiler', status: 'Disponible', icon: <Map aria-hidden="true" /> },
  { category: 'Contaminación lumínica', source: 'Modelo Bortle local', status: 'Local', icon: <Database aria-hidden="true" /> },
];

export const DataStatusPanel = ({ onClose }) => (
  <PanelShell title="Estado de datos" subtitle="Arquitectura de fuentes" onClose={onClose}>
    <p className="panel-intro">Fuentes que componen la vista actual del WebGIS. Los estados son informativos y no representan health checks.</p>
    <div className="data-source-list">
      {DATA_SOURCES.map(({ category, source, status, icon }) => (
        <article key={category}>
          <span className="data-source-icon">{icon}</span>
          <div><span>{category}</span><strong>{source}</strong></div>
          <em className={`source-status is-${status.toLowerCase()}`}>{status}</em>
        </article>
      ))}
    </div>
  </PanelShell>
);
