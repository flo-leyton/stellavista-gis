import { useState } from 'react';
import { PanelShell } from './PanelShell';

const Toggle = ({ label, checked, onChange }) => (
  <label className="settings-toggle-row">
    <span>{label}</span>
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
  </label>
);

export const SettingsPanel = ({ onClose }) => {
  const [density, setDensity] = useState('compact');
  const [textSize, setTextSize] = useState('medium');
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [mapAnimations, setMapAnimations] = useState(true);
  const [mapLabels, setMapLabels] = useState(true);
  const [layerOpacity, setLayerOpacity] = useState(70);
  const [units, setUnits] = useState('metric');
  const [timeFormat, setTimeFormat] = useState('24h');
  const [threshold, setThreshold] = useState('medium');

  return (
    <PanelShell title="Ajustes" subtitle="Preferencias visuales" badge="Local demo" onClose={onClose}>
      <div className="settings-sections">
        <section>
          <h3>Interfaz</h3>
          <label>Densidad<select value={density} onChange={(event) => setDensity(event.target.value)}><option value="compact">Compacta</option><option value="comfortable">Cómoda</option></select></label>
          <label>Tamaño de texto<select value={textSize} onChange={(event) => setTextSize(event.target.value)}><option value="medium">Mediano</option><option value="large">Grande</option></select></label>
          <Toggle label="Mostrar coordenadas" checked={showCoordinates} onChange={setShowCoordinates} />
        </section>
        <section>
          <h3>Mapa</h3>
          <Toggle label="Animaciones de mapa" checked={mapAnimations} onChange={setMapAnimations} />
          <Toggle label="Etiquetas" checked={mapLabels} onChange={setMapLabels} />
          <label>Opacidad de capas <strong>{layerOpacity}%</strong><input type="range" min="20" max="100" value={layerOpacity} onChange={(event) => setLayerOpacity(event.target.value)} /></label>
        </section>
        <section>
          <h3>Observación</h3>
          <label>Unidades<select value={units} onChange={(event) => setUnits(event.target.value)}><option value="metric">Métricas</option><option value="imperial">Imperiales</option></select></label>
          <label>Formato horario<select value={timeFormat} onChange={(event) => setTimeFormat(event.target.value)}><option value="24h">24 horas</option><option value="12h">12 horas</option></select></label>
          <label>Umbral de aptitud<select value={threshold} onChange={(event) => setThreshold(event.target.value)}><option value="medium">Media o superior</option><option value="high">Sólo alta</option></select></label>
        </section>
      </div>
      <p className="panel-demo-note">Estos controles sólo representan preferencias futuras y no alteran cálculos científicos.</p>
    </PanelShell>
  );
};
