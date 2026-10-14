import {
  Bell,
  CircleHelp,
  Clock3,
  LogOut,
  MapPin,
  Settings,
  UserRound,
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'profile', label: 'Perfil', icon: <UserRound aria-hidden="true" /> },
  { id: 'places', label: 'Mis sitios', icon: <MapPin aria-hidden="true" /> },
  { id: 'history', label: 'Historial', icon: <Clock3 aria-hidden="true" /> },
  { id: 'notifications', label: 'Notificaciones', icon: <Bell aria-hidden="true" /> },
  { id: 'settings', label: 'Ajustes', icon: <Settings aria-hidden="true" /> },
  { id: 'help', label: 'Ayuda', icon: <CircleHelp aria-hidden="true" /> },
  { id: 'logout', label: 'Cerrar sesión', icon: <LogOut aria-hidden="true" /> },
];

export const ProfileMenu = ({ onSelect }) => (
  <div className="profile-menu" role="menu">
    <div className="profile-menu-user">
      <span className="profile-avatar">O</span>
      <div>
        <strong>Observador</strong>
        <span>Usuario · Demostración</span>
      </div>
    </div>
    <div className="profile-menu-list">
      {MENU_ITEMS.map(({ id, label, icon }) => (
        <button key={id} type="button" role="menuitem" onClick={() => onSelect(id)}>
          {icon}
          {label}
        </button>
      ))}
    </div>
  </div>
);
