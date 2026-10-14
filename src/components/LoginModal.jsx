import { useState } from 'react';
import { LockKeyhole, Mail, X } from 'lucide-react';

export const LoginModal = ({ onClose }) => {
  const [demoMessage, setDemoMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setDemoMessage('Demo de interfaz: no se inició ninguna sesión.');
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar acceso">
          <X aria-hidden="true" />
        </button>
        <div className="modal-heading">
          <span className="avatar-mark">SV</span>
          <div>
            <span>Cuenta de observación</span>
            <h2 id="login-title">Acceder a la plataforma</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Correo
            <span className="input-with-icon">
              <Mail aria-hidden="true" />
              <input type="email" name="email" autoComplete="email" placeholder="correo@ejemplo.com" required />
            </span>
          </label>
          <label>
            Contraseña
            <span className="input-with-icon">
              <LockKeyhole aria-hidden="true" />
              <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" required />
            </span>
          </label>
          <div className="login-links">
            <button type="button">Crear cuenta</button>
            <button type="button">Recuperar contraseña</button>
          </div>
          <button className="primary-button" type="submit">Iniciar sesión</button>
          <button className="google-button" type="button">
            <span>G</span>
            Continuar con Google
          </button>
        </form>

        {demoMessage && <p className="demo-feedback" role="status">{demoMessage}</p>}
        <p className="modal-note">Autenticación disponible en una próxima etapa.</p>
      </section>
    </div>
  );
};
