import { MapPin, Pencil, Telescope } from 'lucide-react';
import { PanelShell } from './PanelShell';

const DEMO_STATS = [
  { label: 'Sitios guardados', value: '3' },
  { label: 'Observaciones', value: '12' },
  { label: 'Zonas consultadas', value: '8' },
];

export const ProfilePanel = ({ onClose }) => (
  <PanelShell title="Perfil" subtitle="Espacio personal" badge="Datos demo" onClose={onClose}>
    <div className="profile-panel-summary">
      <span className="profile-panel-avatar">O</span>
      <div>
        <h3>Observador</h3>
        <p>Usuario</p>
      </div>
    </div>

    <dl className="profile-details">
      <div>
        <dt><MapPin aria-hidden="true" /> Ubicación preferida</dt>
        <dd>Sin definir</dd>
      </div>
      <div>
        <dt><Telescope aria-hidden="true" /> Nivel de experiencia</dt>
        <dd>Observador aficionado</dd>
      </div>
    </dl>

    <div className="profile-stats">
      {DEMO_STATS.map(({ label, value }) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>

    <button className="secondary-button" type="button">
      <Pencil aria-hidden="true" />
      Editar perfil
    </button>
    <p className="panel-demo-note">Vista previa. Los cambios de perfil no se guardan.</p>
  </PanelShell>
);
