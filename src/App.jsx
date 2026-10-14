import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useState } from 'react';
import {
  Bell,
  Clock3,
  Layers3,
  Map as MapIcon,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  Telescope,
} from 'lucide-react';
import { useAstroStore } from './store/useAstroStore';
import { useCondicionesNocturnas } from './hooks/useCondicionesNocturnas';
import { Topbar } from './components/Topbar';
import { ScorePanel } from './components/ScorePanel';
import { LayerControl } from './components/LayerControl';
import { CoordsPanel } from './components/CoordsPanel';
import { AstroPanel } from './components/AstroPanel';
import { ForecastBar } from './components/ForecastBar';
import { MapaInteractivo } from './components/MapaInteractivo';
import { LoginModal } from './components/LoginModal';
import { PanelShell } from './components/PanelShell';
import { ProfilePanel } from './components/ProfilePanel';
import { SavedPlacesPanel } from './components/SavedPlacesPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { NotificationsPanel } from './components/NotificationsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { DataStatusPanel } from './components/DataStatusPanel';
import { HelpPanel } from './components/HelpPanel';
import { SearchPanel } from './components/SearchPanel';

function App() {
  const {
    coordinates,
    setCoordinates,
    isRedMode,
    layers,
    toggleLayer,
  } = useAstroStore();
  const { data, isLoading } = useCondicionesNocturnas();
  const [activePanel, setActivePanel] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [searchRequest, setSearchRequest] = useState({ query: '', id: 0 });
  const [isRailExpanded, setRailExpanded] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('astro-red', isRedMode);
  }, [isRedMode]);

  const manejaClic = (evento) => {
    const { lng, lat } = evento.lngLat;
    setCoordinates({ lat, lng });
  };

  const openPanel = (panelName) => setActivePanel(panelName);

  const handleSearch = (query) => {
    setSearchRequest((request) => ({ query, id: request.id + 1 }));
    openPanel('search');
  };

  const handleProfileAction = (action) => {
    const panelByAction = {
      profile: 'profile',
      places: 'saved',
      history: 'history',
      notifications: 'notifications',
      settings: 'settings',
      help: 'help',
    };
    setActivePanel(panelByAction[action] ?? null);
  };

  const renderSecondaryPanel = () => {
    const closePanel = () => setActivePanel(null);

    if (activePanel === 'layers') {
      return (
        <PanelShell
          title="Capas del mapa"
          subtitle="Control de visualización cartográfica"
          onClose={closePanel}
        >
          <LayerControl />
        </PanelShell>
      );
    }

    if (activePanel === 'astro') {
      return (
        <AstroPanel
          faseLunar={data?.faseLunar ?? 0}
          lunaFase={data?.lunaFase ?? 0}
          onClose={closePanel}
        />
      );
    }

    if (activePanel === 'search') {
      return (
        <SearchPanel
          key={searchRequest.id}
          onClose={closePanel}
          initialQuery={searchRequest.query}
        />
      );
    }
    if (activePanel === 'profile') return <ProfilePanel onClose={closePanel} />;
    if (activePanel === 'saved') return <SavedPlacesPanel onClose={closePanel} />;
    if (activePanel === 'history') return <HistoryPanel onClose={closePanel} />;
    if (activePanel === 'notifications') return <NotificationsPanel onClose={closePanel} />;
    if (activePanel === 'settings') return <SettingsPanel onClose={closePanel} />;
    if (activePanel === 'data') return <DataStatusPanel onClose={closePanel} />;
    if (activePanel === 'help') return <HelpPanel onClose={closePanel} />;
    return null;
  };

  const navItems = [
    { id: null, label: 'Mapa', icon: <MapIcon aria-hidden="true" /> },
    { id: 'search', label: 'Buscar', icon: <Search aria-hidden="true" /> },
    { id: 'layers', label: 'Capas', icon: <Layers3 aria-hidden="true" /> },
    { id: 'aptitude', label: 'Aptitud', icon: <Sparkles aria-hidden="true" /> },
    { id: 'astro', label: 'Astronomía', icon: <Telescope aria-hidden="true" /> },
    { id: 'saved', label: 'Sitios', icon: <MapPin aria-hidden="true" /> },
    { id: 'history', label: 'Historial', icon: <Clock3 aria-hidden="true" /> },
  ];

  return (
    <div className={`observatory-shell ${isRailExpanded ? 'rail-expanded' : 'rail-collapsed'}`}>
      <Topbar
        coordinates={coordinates}
        onSearch={handleSearch}
        onOpenLogin={() => {
          setActivePanel(null);
          setLoginVisible(true);
        }}
        onProfileAction={handleProfileAction}
        onOpenDataStatus={() => openPanel('data')}
      />

      <div className="observatory-stage">
        <main className="map-surface">
          <MapaInteractivo onClic={manejaClic} />
        </main>

        <nav
          className={`observatory-rail ${isRailExpanded ? 'is-expanded' : 'is-collapsed'}`}
          aria-label="Navegación principal"
        >
          <button
            className="rail-toggle"
            type="button"
            onClick={() => setRailExpanded((expanded) => !expanded)}
            aria-expanded={isRailExpanded}
            title={isRailExpanded ? 'Contraer navegación' : 'Expandir navegación'}
          >
            {isRailExpanded
              ? <PanelLeftClose aria-hidden="true" />
              : <PanelLeftOpen aria-hidden="true" />}
            <span>{isRailExpanded ? 'Contraer' : 'Expandir'}</span>
          </button>
          {navItems.map(({ id, label, icon }) => {
            const isAptitude = id === 'aptitude';
            const isActive = isAptitude
              ? layers.zonificacionAptitud
              : activePanel === id || (id === null && activePanel === null);

            return (
              <button
                key={label}
                className={`rail-button ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  if (isAptitude) {
                    toggleLayer('zonificacionAptitud');
                    setActivePanel(null);
                  } else {
                    setActivePanel(id);
                  }
                }}
                aria-label={label}
                aria-pressed={isAptitude ? layers.zonificacionAptitud : isActive}
                title={label}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}

          <button
            className={`rail-button rail-notifications ${activePanel === 'notifications' ? 'is-active' : ''}`}
            onClick={() => openPanel('notifications')}
            aria-label="Notificaciones de demostración"
            title="Notificaciones"
          >
            <Bell aria-hidden="true" />
            <span>Alertas</span>
          </button>
        </nav>

        <aside className="context-inspector" aria-label="Inspector de ubicación">
          <div className="inspector-heading">
            <div>
              <span>Ubicación seleccionada</span>
              <h2>Análisis del punto</h2>
            </div>
          </div>
          <ScorePanel data={data} isLoading={isLoading} />
          <CoordsPanel altitud={data?.altitud} bortleInfo={data?.bortleInfo} />
        </aside>

        {activePanel && (
          <aside className="secondary-drawer" aria-label="Panel secundario">
            {renderSecondaryPanel()}
          </aside>
        )}

        <div className="forecast-dock">
          <ForecastBar forecast={data?.forecast} dataActual={data} />
        </div>
      </div>

      {loginVisible && <LoginModal onClose={() => setLoginVisible(false)} />}
    </div>
  );
}

export default App;
