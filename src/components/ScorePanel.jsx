// src/components/ScorePanel.jsx
import { calcularScore } from '../utils/astroLogic';

const getEstado = (score) => {
  if (score >= 75) return { label: 'Condiciones óptimas', shadow: 'shadow-neu-sky',  border: 'border-astro-sky/20' };
  if (score >= 45) return { label: 'Condiciones parciales', shadow: 'shadow-neu-horizon', border: 'border-astro-horizon/20' };
  return                  { label: 'Condiciones adversas', shadow: 'shadow-neu-nebula', border: 'border-astro-nebula/20' };
};

const getColorScore = (score) => {
  if (score >= 75) return 'text-astro-sky';
  if (score >= 45) return 'text-astro-horizon';
  return 'text-astro-nebula';
};

export const ScorePanel = ({ data, isLoading }) => {
  if (isLoading) return (
    <section className="score-card is-loading">
      <span className="eyebrow">Índice de observación</span>
      <p>ACTUALIZANDO DATOS...</p>
    </section>
  );

  if (!data) return (
    <section className="score-card is-loading">
      <span className="eyebrow">Índice de observación</span>
      <p className="text-astro-horizon">SIN DATOS DISPONIBLES</p>
    </section>
  );

  const score = calcularScore(data);
  const { label, shadow, border } = getEstado(score);
  const colorScore = getColorScore(score);
  return (
    <section className={`score-card ${border} ${shadow}`}>
      <div className="score-card-head">
        <div>
          <span className="eyebrow">Índice de observación</span>
          <p>{label}</p>
        </div>
      </div>

      <div className="score-primary">
        <span className={`score-value ${colorScore}`}>{score}</span>
        <span className="score-unit">/100</span>
        <div className="score-gauge">
          <div
            className={score >= 75 ? 'bg-astro-sky' : score >= 45 ? 'bg-astro-horizon' : 'bg-astro-nebula'}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="score-metrics">
        {[
          { key: 'NUBES', val: `${data.nubosidad}%` },
          { key: 'LUNA', val: `${Math.round(data.faseLunar)}%` },
          { key: 'JET 200', val: `${Math.round(data.jetstream)} km/h` },
        ].map(({ key, val }) => (
          <div key={key}>
            <span>{key}</span>
            <strong>{val}</strong>
          </div>
        ))}
      </div>

      <div className="score-scale" aria-hidden="true">
        <span>ADVERSO</span>
        <span>PARCIAL</span>
        <span>ÓPTIMO</span>
      </div>
      <div className="score-scale-line">
        <div
          className="score-scale-position"
          style={{ left: `${score}%` }}
        />
      </div>
    </section>
  );
};
