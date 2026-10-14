import { X } from 'lucide-react';

export const PanelShell = ({ title, subtitle, badge, onClose, children }) => (
  <section className="secondary-panel">
    <header className="secondary-panel-header">
      <div>
        {subtitle && <span>{subtitle}</span>}
        <h2>{title}</h2>
      </div>
      <div className="secondary-panel-actions">
        {badge && <span className="demo-badge">{badge}</span>}
        <button type="button" onClick={onClose} aria-label={`Cerrar ${title}`}>
          <X aria-hidden="true" />
        </button>
      </div>
    </header>
    <div className="secondary-panel-content">{children}</div>
  </section>
);
