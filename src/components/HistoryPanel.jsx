import { PanelShell } from './PanelShell';

const DEMO_HISTORY = [
  { place: 'Sajama', date: '24 jun · 21:40', score: 92, bortle: 2, suitability: 'Alta' },
  { place: 'Oruro', date: '23 jun · 22:15', score: 58, bortle: 7, suitability: 'Baja' },
  { place: 'Salar de Coipasa', date: '18 jun · 20:32', score: 88, bortle: 2, suitability: 'Alta' },
  { place: 'Lago Uru Uru', date: '11 jun · 23:05', score: 71, bortle: 5, suitability: 'Media' },
];

export const HistoryPanel = ({ onClose }) => (
  <PanelShell title="Historial" subtitle="Consultas recientes" badge="Datos demo" onClose={onClose}>
    <div className="history-list">
      {DEMO_HISTORY.map((item) => (
        <article key={`${item.place}-${item.date}`}>
          <span className="history-score">{item.score}</span>
          <div className="history-place">
            <h3>{item.place}</h3>
            <p>{item.date}</p>
          </div>
          <div className="history-classification">
            <strong>Bortle {item.bortle}</strong>
            <span>Aptitud {item.suitability}</span>
          </div>
        </article>
      ))}
    </div>
    <p className="panel-demo-note">Historial disponible cuando se habilite persistencia.</p>
  </PanelShell>
);
