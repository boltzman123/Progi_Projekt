import { Navigate } from 'react-router-dom';

function CanDonateRoute ({
    user,
    redirectPath = '/base',
    children,
}) {
    user = JSON.parse(window.localStorage.getItem('user'))

    if (user.canDonate === false) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
};

export default CanDonateRoute