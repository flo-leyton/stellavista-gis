// src/components/LayerControl.jsx
import { useAstroStore } from '../store/useAstroStore';

const LAYERS = [
  {
    key: 'contaminacionLuminica',
    label: 'Contaminacion luminica',
    description: 'Modelo Bortle',
    dot: 'bg-astro-sky',
  },
  /*{
    : 'nubosidad',
    label: 'Nubosidad',
    description: 'Cobertura nubosa actual',
    dot: 'bg-astro-sky',
  },*/
  {
    key: 'zonificacionAptitud',
    label: 'Aptitud astronómica',
    description: 'Urbana · periurbana · rural',
    dot: 'bg-emerald-400',
  },
  {
    key: 'sitiosRecomendados',
    label: 'Sitios recomendados',
    description: 'Puntos óptimos de observación',
    dot: 'bg-astro-nebula',
  },
];

const BORTLE_LEGEND = [
  { color: '#4c1d95', label: 'Bortle 1-2: cielo oscuro' },
  { color: '#38bdf8', label: 'Bortle 3-4: buen cielo rural' },
  { color: '#fb923c', label: 'Bortle 5-6: transicion/periurbano' },
  { color: '#db2777', label: 'Bortle 7-9: urbano contaminado' },
];

const ZONING_LEGEND = [
  { color: '#22c55e', title: 'APTITUD ALTA', label: 'Rural' },
  { color: '#f59e0b', title: 'APTITUD MEDIA', label: 'Periurbana' },
  { color: '#ef4444', title: 'APTITUD BAJA', label: 'Urbana' },
];

export const LayerControl = () => {
  const { layers, toggleLayer } = useAstroStore();

  return (
    <div className="layer-control">
      <div className="layer-control-title">
        <span>Visibilidad</span>
        <span>{Object.values(layers).filter(Boolean).length} activas</span>
      </div>

      <div className="flex flex-col gap-2">
        {LAYERS.map(({ key, label, description, dot }) => {
          const isActive = layers[key];

          return (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              aria-pressed={isActive}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                border transition-all duration-200 text-left
                ${isActive
                  ? 'bg-slate-900/90 border-slate-600/60'
                  : 'bg-slate-950/60 border-slate-800/60 opacity-55'
                }
              `}
            >
              <div className={`
                w-2 h-2 rounded-full shrink-0 transition-all duration-300
                ${isActive ? dot : 'bg-astro-dim'}
              `} />

              <div className="flex-1 min-w-0">
                <p className={`
                  text-[11px] font-medium tracking-wide transition-colors duration-300
                  ${isActive ? 'text-astro-text' : 'text-astro-dim'}
                `}>
                  {label}
                </p>
                <p className="text-[9px] text-astro-dim truncate">
                  {description}
                </p>
              </div>

              <div className={`
                relative w-8 h-4 rounded-full shrink-0
                transition-all duration-300
                ${isActive
                  ? 'bg-neu-raised shadow-neu-sm border border-neu-border'
                  : 'bg-neu-sunken shadow-neu-inset border border-transparent'
                }
              `}>
                <div className={`
                  absolute top-0.5 w-3 h-3 rounded-full
                  transition-all duration-300
                  ${isActive
                    ? 'left-4 bg-astro-sky'
                    : 'left-0.5 bg-astro-dim'
                  }
                `} />
              </div>
            </button>
          );
        })}
      </div>

      {layers.contaminacionLuminica && (
        <details className="map-legend collapsible-legend">
          <summary>Leyenda Bortle</summary>
          <div className="legend-content">
            {BORTLE_LEGEND.map(({ color, label }) => (
              <div key={label} className="legend-scale-row">
                <span className="legend-scale-swatch" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      {layers.zonificacionAptitud && (
        <details className="map-legend zoning-legend collapsible-legend" open>
          <summary>Leyenda de aptitud</summary>
          <div className="legend-content">
            {ZONING_LEGEND.map(({ color, title, label }) => (
              <div key={title} className="zoning-legend-row">
                <span className="zoning-swatch" style={{ backgroundColor: color }} />
                <span>
                  <strong>{title}</strong>
                  <small>{label}</small>
                </span>
              </div>
            ))}
            <p className="legend-note">
              Zonificación modelada por influencia lumínica basada en la escala Bortle.
            </p>
          </div>
        </details>
      )}
    </div>
  );
};
