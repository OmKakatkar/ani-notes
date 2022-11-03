import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

export type LocationState = {
  path: string;
};

function Auth() {
  const { user } = useAuth();
  const locationState = useLocation().state as LocationState;

  if (user.token) {
    return (
      <Navigate
        replace
        to={locationState?.path || '/'}
      />
    );
  }

  return <Outlet />;
}
export default Auth;
