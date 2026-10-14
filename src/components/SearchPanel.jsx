import { useEffect, useRef, useState } from 'react';
import { AlertCircle, LoaderCircle, MapPin, Search } from 'lucide-react';
import { useAstroStore } from '../store/useAstroStore';
import {
  parseCoordinateQuery,
  searchLocations,
} from '../services/openMeteoGeocoding';
import { PanelShell } from './PanelShell';

const DEBOUNCE_MS = 350;

const getAdministrativeArea = (result) => (
  [result.admin2, result.admin1].filter(Boolean).join(' · ')
);

export const SearchPanel = ({ onClose, initialQuery = '' }) => {
  const focusCoordinates = useAstroStore((state) => state.focusCoordinates);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(initialQuery.trim().length >= 3 ? 'pending' : 'idle');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [resultsVisible, setResultsVisible] = useState(true);
  const requestIdRef = useRef(0);
  const skipNextSearchRef = useRef(false);

  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return undefined;
    }

    const controller = new AbortController();
    const requestId = ++requestIdRef.current;
    const trimmedQuery = query.trim();

    const timeoutId = window.setTimeout(async () => {
      const directCoordinates = parseCoordinateQuery(trimmedQuery);

      if (directCoordinates) {
        focusCoordinates({ ...directCoordinates, zoom: 11 });
        setResults([]);
        setStatus('coordinates');
        setResultsVisible(false);
        return;
      }

      if (trimmedQuery.length < 3) {
        setResults([]);
        setStatus('idle');
        return;
      }

      setStatus('searching');

      try {
        const locations = await searchLocations(trimmedQuery, {
          signal: controller.signal,
        });

        if (requestId !== requestIdRef.current) return;
        setResults(locations);
        setActiveIndex(locations.length ? 0 : -1);
        setStatus(locations.length ? 'success' : 'empty');
      } catch (error) {
        if (error.name === 'AbortError') return;
        if (requestId !== requestIdRef.current) return;
        setResults([]);
        setActiveIndex(-1);
        setStatus('error');
      }
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [focusCoordinates, query]);

  const selectLocation = (location) => {
    const lat = Number(location.latitude);
    const lng = Number(location.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    focusCoordinates({ lat, lng, zoom: 11 });
    skipNextSearchRef.current = true;
    setQuery(location.name);
    setStatus('selected');
    setResultsVisible(false);
  };

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setResults([]);
    setActiveIndex(-1);
    setResultsVisible(true);
    setStatus(nextQuery.trim().length >= 3 ? 'pending' : 'idle');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setResultsVisible(false);
      setActiveIndex(-1);
      return;
    }

    if (!resultsVisible || !results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectLocation(results[activeIndex >= 0 ? activeIndex : 0]);
    }
  };

  const statusMessage = {
    idle: 'Escribe al menos 3 caracteres para buscar localidades de Bolivia.',
    pending: 'Preparando búsqueda…',
    searching: 'Buscando localidades…',
    success: `${results.length} ${results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}. Usa las flechas y Enter para seleccionar.`,
    empty: 'No se encontraron localidades para esta consulta.',
    error: 'No fue posible consultar el servicio. Revisa la conexión e intenta nuevamente.',
    selected: 'Localidad seleccionada. Actualizando el análisis geoespacial…',
    coordinates: 'Coordenadas válidas seleccionadas. Actualizando el análisis…',
  }[status];

  return (
    <PanelShell title="Buscar" subtitle="Localidades de Bolivia" badge="Open-Meteo" onClose={onClose}>
      <label className="panel-search-field">
        <Search aria-hidden="true" />
        <input
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setResultsVisible(true)}
          placeholder="Buscar lugar o latitud, longitud"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={resultsVisible && results.length > 0}
          aria-controls="location-search-results"
          aria-activedescendant={activeIndex >= 0 ? `location-result-${activeIndex}` : undefined}
          autoFocus
        />
      </label>

      <p className={`search-caption search-status is-${status}`} aria-live="polite">
        {status === 'searching' && <LoaderCircle className="search-spinner" aria-hidden="true" />}
        {status === 'error' && <AlertCircle aria-hidden="true" />}
        {statusMessage}
      </p>

      {resultsVisible && results.length > 0 && (
        <div className="search-results" id="location-search-results" role="listbox" aria-label="Resultados de localidades">
          {results.map((location, index) => {
            const administrativeArea = getAdministrativeArea(location);
            const elevation = Number.isFinite(location.elevation)
              ? `${Math.round(location.elevation)} m`
              : null;

            return (
              <button
                type="button"
                role="option"
                id={`location-result-${index}`}
                key={location.id ?? `${location.name}-${location.latitude}-${location.longitude}`}
                className={index === activeIndex ? 'is-active' : ''}
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectLocation(location)}
              >
                <MapPin aria-hidden="true" />
                <span>
                  <strong>{location.name}</strong>
                  {administrativeArea && <small>{administrativeArea}</small>}
                  <small>{[location.country, elevation].filter(Boolean).join(' · ')}</small>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </PanelShell>
  );
};
