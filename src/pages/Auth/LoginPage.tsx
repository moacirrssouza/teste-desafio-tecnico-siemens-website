import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="page login-page">
      <div className="page-container">
        <h1>Login Necessário</h1>
        <p>
          Sua sessão não está autenticada ou expirou. Configure a autenticação do backend
          ou forneça um token válido para acessar os recursos protegidos.
        </p>
        <p>
          Se você não possui autenticação no backend, ajuste o interceptor de 401 em
          src/utils/apiClient.ts para não redirecionar.
        </p>
        <div className="form-actions" style={{ marginTop: 16 }}>
          <Link to="/" className="btn btn-primary">Ir para Home</Link>
        </div>
      </div>
    </div>
  );
};
