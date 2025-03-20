import Root from './Root';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import SigninPage from './components/pages/SigninPage/SigninPage';
import SignupPage from './components/pages/SignupPage/SignupPage';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { userRefresh as userInitialLoad } from './redux/thunkActions';
import DashBoard from './components/organisms/DashBoard/DashBoard';
import Promopage from './components/pages/Promopage/Promopage';
import CompanyHomePage from './components/pages/CompanyHomePage/CompanyHomePage';
import PromoForm from './components/molecules/PromoForm/PromoForm';
import DashboardCompany from './components/organisms/DashboardCompany/DashboardCompany';
import { User } from './types';
import Participants from './components/pages/Participants/Participants';

function App() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.appSlice.user);
  const [state, setState] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(userInitialLoad());
      setState(true);
    })();
  }, []);

  function ProtectedAuth({
    user,
    children,
  }: {
    user: { user: User; isAuth: boolean };
    children: React.ReactNode;
  }) {
    return user.isAuth ? (
      user.user.isCompany ? (
        <Navigate to="/dashboard-company" />
      ) : (
        <Navigate to="/dashboard" />
      )
    ) : (
      children
    );
  }

  function ProtectedUser({
    user,
    children,
  }: {
    user: { isAuth: boolean };
    children: React.ReactNode;
  }) {
    return user.isAuth ? children : <Navigate to="/signin" />;
  }

  function CompanyOnly({
    user,
    children,
  }: {
    user: { user: User; isAuth: boolean };
    children: React.ReactNode;
  }) {
    return user.isAuth && user.user.isCompany ? (
      children
    ) : (
      <Navigate to="/signin" />
    );
  }

  function UserOnly({
    user,
    children,
  }: {
    user: { user: User; isAuth: boolean };
    children: React.ReactNode;
  }) {
    return user.isAuth && !user.user.isCompany ? (
      children
    ) : (
      <Navigate to="/signin" />
    );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/signin',
          element: (
            <ProtectedAuth user={user}>
              <SigninPage />
            </ProtectedAuth>
          ),
        },
        {
          path: '/signup',
          element: (
            <ProtectedAuth user={user}>
              <SignupPage />
            </ProtectedAuth>
          ),
        },
        {
          path: '/dashboard',
          element: (
            <UserOnly user={user}>
              <DashBoard />
            </UserOnly>
          ),
        },
        {
          path: '/test',
          element: <PromoForm />,
        },
        {
          path: '/promopage/:id',
          element: <Promopage />,
        },
        {
          path: '/forcompanies',
          element: <CompanyHomePage />,
        },
        {
          path: '/dashboard-company',
          element: (
            <CompanyOnly user={user}>
              <DashboardCompany target="company" />,
            </CompanyOnly>
          ),
        },
        {
          path: '/participants/promo/:id',
          element: (
            <CompanyOnly user={user}>
              <Participants />
            </CompanyOnly>
          ),
        },
      ],
    },
  ]);

  if (!state) {
    return <div>Загрузка...</div>; // Можно показать индикатор загрузки, например, спиннер
  }

  return <RouterProvider router={router} />;
}

export default App;
