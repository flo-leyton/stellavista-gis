import { Eye, LocateFixed, Trash2 } from 'lucide-react';
import { PanelShell } from './PanelShell';

const DEMO_PLACES = [
  { name: 'Sajama', coordinates: '-18.1167, -68.8833', bortle: 2, suitability: 'Alta', date: '24 jun 2026' },
  { name: 'Salar de Coipasa', coordinates: '-19.1833, -68.7000', bortle: 2, suitability: 'Alta', date: '18 jun 2026' },
  { name: 'Lago Uru Uru', coordinates: '-17.9333, -67.0833', bortle: 5, suitability: 'Media', date: '11 jun 2026' },
];

export const SavedPlacesPanel = ({ onClose }) => (
  <PanelShell title="Mis sitios" subtitle="Ubicaciones guardadas" badge="Datos demo" onClose={onClose}>
    <div className="compact-list">
      {DEMO_PLACES.map((place) => (
        <article className="place-card" key={place.name}>
          <header>
            <div><h3>{place.name}</h3><p>{place.coordinates}</p></div>
            <span className={`aptitude-pill is-${place.suitability.toLowerCase()}`}>Aptitud {place.suitability}</span>
          </header>
          <div className="place-meta">
            <span>Bortle {place.bortle}</span>
            <span>Última consulta: {place.date}</span>
          </div>
          <footer className="card-actions">
            <button type="button"><LocateFixed aria-hidden="true" /> Centrar mapa</button>
            <button type="button"><Eye aria-hidden="true" /> Ver análisis</button>
            <button type="button" aria-label={`Eliminar ${place.name}`}><Trash2 aria-hidden="true" /></button>
          </footer>
        </article>
      ))}
    </div>
    <p className="panel-demo-note">Datos de demostración. La persistencia se habilitará en una etapa posterior.</p>
  </PanelShell>
);
