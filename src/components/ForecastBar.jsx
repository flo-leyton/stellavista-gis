// src/components/ForecastBar.jsx
import { calcularScore } from '../utils/astroLogic';

const getColorFranja = (score) => {
  if (score >= 75) return {
    texto:  'text-astro-sky',
    barra:  'bg-astro-sky',
    glow:   'shadow-neu-sky',
    border: 'border-astro-sky/20',
  };
  if (score >= 45) return {
    texto:  'text-astro-horizon',
    barra:  'bg-astro-horizon',
    glow:   'shadow-neu-horizon',
    border: 'border-astro-horizon/20',
  };
  return {
    texto:  'text-astro-nebula',
    barra:  'bg-astro-nebula',
    glow:   'shadow-neu-nebula',
    border: 'border-astro-nebula/20',
  };
};

export const ForecastBar = ({ forecast, dataActual }) => {
  if (!forecast?.length) return null;

  return (
    <footer className="forecast-timeline">
      <div className="forecast-label">
        <span>Ventana de observación</span>
        <strong>PRÓXIMAS 8 HORAS</strong>
      </div>

      <div className="forecast-slots" style={{ gridTemplateColumns: `repeat(${forecast.length}, minmax(180px, 1fr))` }}>
        {forecast.map(({ hora, nubosidad, jetstream }) => {
          // Calculamos score por franja usando datos parciales
          const scoreFranja = calcularScore({
            nubosidad,
            jetstream,
            faseLunar: dataActual?.faseLunar ?? 0,
            altitud:   dataActual?.altitud   ?? 3700,
            bortle:    dataActual?.bortle    ?? 4,
          });

          const { texto, barra, glow, border } = getColorFranja(scoreFranja);

          return (
            <div
              key={hora}
              className={`forecast-slot ${border} ${glow}`}
            >
              <div className="forecast-slot-heading">
                <p className="forecast-hour">{hora}</p>
                <p className={`forecast-score ${texto}`}>{scoreFranja}</p>
              </div>
              <p className="forecast-clouds"><span>Nubes</span><strong>{nubosidad}%</strong></p>
              <div className="forecast-track">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barra}`}
                  style={{ width: `${scoreFranja}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
};
