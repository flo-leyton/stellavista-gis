import { useState } from 'react';
import { ChevronDown, Database, LogIn, Moon, Search, UserRound } from 'lucide-react';
import { useAstroStore } from '../store/useAstroStore';
import { ProfileMenu } from './ProfileMenu';

export const Topbar = ({
  coordinates,
  onSearch,
  onOpenLogin,
  onProfileAction,
  onOpenDataStatus,
}) => {
  const { isRedMode, toggleRedMode } = useAstroStore();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('location-search')?.toString().trim() ?? '';
    onSearch(query);
  };

  const handleProfileSelect = (action) => {
    setProfileMenuVisible(false);
    onProfileAction(action);
  };

  return (
    <header className="observatory-topbar">
      <div className="topbar-brand">
        <img
          src="/logo-stellavista.png"
          alt="StellaVista"
          className="topbar-logo"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <form className="topbar-search" role="search" onSubmit={handleSearch}>
        <Search aria-hidden="true" />
        <input name="location-search" aria-label="Buscar lugar o coordenadas" placeholder="Buscar lugar o coordenadas…" />
        <kbd>ENTER</kbd>
      </form>

      <div className="topbar-coordinates" aria-label="Coordenadas activas">
        <span>LAT <b>{coordinates.lat.toFixed(4)}</b></span>
        <span>LNG <b>{coordinates.lng.toFixed(4)}</b></span>
        <span>EPSG <b>4326 / WGS84</b></span>
      </div>

      <div className="topbar-actions">
        <button className="data-status-button" type="button" onClick={onOpenDataStatus}>
          <Database aria-hidden="true" />
          <span>Fuentes</span>
        </button>
        <button
          type="button"
          onClick={toggleRedMode}
          aria-pressed={isRedMode}
          className={`night-mode-button ${isRedMode ? 'is-active' : ''}`}
          title="Alternar visión nocturna"
        >
          <Moon aria-hidden="true" />
          <span>Noche</span>
        </button>
        <button className="login-access-button" type="button" onClick={onOpenLogin}>
          <LogIn aria-hidden="true" />
          <span>Acceder</span>
        </button>
        <div className="profile-menu-anchor">
          <button
            className="profile-trigger"
            type="button"
            onClick={() => setProfileMenuVisible((visible) => !visible)}
            aria-expanded={profileMenuVisible}
            aria-haspopup="menu"
          >
            <span className="profile-avatar"><UserRound aria-hidden="true" /></span>
            <span className="profile-trigger-copy"><strong>Observador</strong><small>Demo</small></span>
            <ChevronDown aria-hidden="true" />
          </button>
          {profileMenuVisible && <ProfileMenu onSelect={handleProfileSelect} />}
        </div>
      </div>
    </header>
  );
};
