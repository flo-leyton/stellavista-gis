import { Layers3, MapPin, MoonStar, Sparkles, Target } from 'lucide-react';
import { PanelShell } from './PanelShell';

const CONCEPTS = [
  { term: 'Bortle', description: 'Escala estimada de oscuridad del cielo.', icon: <MoonStar aria-hidden="true" /> },
  { term: 'Aptitud astronómica', description: 'Interpretación territorial derivada del Bortle.', icon: <Sparkles aria-hidden="true" /> },
  { term: 'Coordenadas', description: 'Posición geográfica activa en WGS84.', icon: <MapPin aria-hidden="true" /> },
  { term: 'Capas', description: 'Información temática superpuesta al mapa.', icon: <Layers3 aria-hidden="true" /> },
  { term: 'Score', description: 'Síntesis de condiciones para observación.', icon: <Target aria-hidden="true" /> },
];

export const HelpPanel = ({ onClose }) => (
  <PanelShell title="Ayuda y acerca de" subtitle="StellaVista GIS" onClose={onClose}>
    <p className="about-copy">Esta plataforma integra información geoespacial, atmosférica y astronómica para apoyar la evaluación de sitios de observación.</p>
    <section className="concept-list">
      <h3>Conceptos</h3>
      {CONCEPTS.map(({ term, description, icon }) => (
        <article key={term}>
          {icon}
          <div><strong>{term}</strong><p>{description}</p></div>
        </article>
      ))}
    </section>
  </PanelShell>
);
