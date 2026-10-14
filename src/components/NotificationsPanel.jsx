import { BellRing, CloudSun, Sparkles } from 'lucide-react';
import { PanelShell } from './PanelShell';

const DEMO_NOTIFICATIONS = [
  { title: 'Condiciones favorables', text: 'Una ventana de aptitud alta podría estar disponible en Sajama.', icon: <Sparkles aria-hidden="true" />, tone: 'success' },
  { title: 'Mejora de nubosidad', text: 'Ejemplo de aviso para una reducción prevista de cobertura nubosa.', icon: <CloudSun aria-hidden="true" />, tone: 'info' },
  { title: 'Recordatorio astronómico', text: 'Ejemplo de recordatorio para revisar un sitio antes de una observación.', icon: <BellRing aria-hidden="true" />, tone: 'neutral' },
];

export const NotificationsPanel = ({ onClose }) => (
  <PanelShell title="Notificaciones" subtitle="Centro de avisos" badge="Demo" onClose={onClose}>
    <div className="notification-list">
      {DEMO_NOTIFICATIONS.map(({ title, text, icon, tone }) => (
        <article key={title} className={`notification-item is-${tone}`}>
          <span>{icon}</span>
          <div><h3>{title}</h3><p>{text}</p></div>
        </article>
      ))}
    </div>
    <p className="panel-demo-note">Ejemplos visuales. No existen alertas ni temporizadores activos.</p>
  </PanelShell>
);
