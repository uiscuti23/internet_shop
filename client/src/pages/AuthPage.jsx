import '../styles/authpg/auth_page.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/forms/LoginForm';
import { CustomLink } from '../components/CustomLink';
import { login, registration } from '../http/UserApi';
import { useAuth } from '../hook/useAuth';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

import { observer } from 'mobx-react-lite';

const AuthPage = () => {
  const location = useLocation();

  const fromPage = useMemo(() => {
    return findFromPage();
  }, []);

  const isLogin = location.pathname === '/login';
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);

  const [loginEmailErrList, setLoginEmailErrList] = useState([]);
  const [loginPassErrList, setLoginPassErrList] = useState([]);

  const [regEmailErrList, setRegEmailErrList] = useState([]);
  const [regPassErrList, setRegPassErrList] = useState([]);

  const watchFieldEmail = watch('user_email');
  const watchFieldPassword = watch('user_password');

  const emailErrMess = [
    'Некорректный email',
    'Пользователь с таким email уже существует',
    'Пользователь не найден',
  ];

  const passErrMess = ['Некорректный password', 'Указан неверный пароль'];

  const fillErrArray = (servErrArr, state, setState, watchField, errorMess) => {
    if (servErrArr.includes(errorMess) && !state.find(item => item[0] === watchField)) {
      setState([...state, [watchField, errorMess]]);
    }
  };

  const fillEmailErrArrays = (state, setState, errorMess) =>
    fillErrArray(emailErrMess, state, setState, watchFieldEmail, errorMess);

  const fillPassErrArrays = (state, setState, errorMess) =>
    fillErrArray(passErrMess, state, setState, watchFieldPassword, errorMess);

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const enter = async data => {
    const { user_email, user_password } = data;
    try {
      setLoading(true);
      const data = isLogin
        ? await login(user_email, user_password)
        : await registration(user_email, user_password);
      logIn(data);
      resetStates();
      reset();
      navigate(fromPage, { replace: true });
    } catch (err) {
      const errorMessage = err.response.data.message;

      if (isLogin) {
        fillEmailErrArrays(loginEmailErrList, setLoginEmailErrList, errorMessage);
        fillPassErrArrays(loginPassErrList, setLoginPassErrList, errorMessage);
      } else {
        fillEmailErrArrays(regEmailErrList, setRegEmailErrList, errorMessage);
        fillPassErrArrays(regPassErrList, setRegPassErrList, errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetStates = () => {
    setLoginEmailErrList([]);
    setLoginPassErrList([]);
    setRegEmailErrList([]);
    setRegPassErrList([]);
  };

  function findFromPage() {
    let pathName = location.state?.from.pathname || '/';
    let rootRoute = '';

    if (pathName.length !== 1) {
      rootRoute = findRootRoute(pathName);
    }

    if (!['/admin', '/basket', '/device'].includes(rootRoute)) {
      pathName = '/';
    }

    return pathName;
  }

  function findRootRoute(route) {
    const target = '/',
      slashPos = [];
    let pos = -1;

    while ((pos = route.indexOf(target, pos + 1)) !== -1) {
      if (slashPos.length === 2) {
        break;
      }
      slashPos.push(pos);
    }

    const rootRoute = slashPos.length === 2 ? route.slice(0, slashPos[1]) : route;
    return rootRoute;
  }

  const params = {
    emailReg: EMAIL_REGEXP,
    passwordReg: PASSWORD_REGEXP,
    enter,
    isLogin,
    loginEmailErrList,
    loginPassErrList,
    regEmailErrList,
    regPassErrList,
    watchFieldEmail,
    watchFieldPassword,
    loading,
  };
  const hookFormValues = { register, errors, isValid, handleSubmit, watch };

  return (
    <div className='auth-page'>
      <div className='auth-page__content'>
        <h2>
          <CustomLink to='/login'>Sign in</CustomLink>
          <span>/</span>
          <CustomLink to='/registration'>Register</CustomLink>
        </h2>
        <LoginForm params={params} hookFormValues={hookFormValues} />
        <div style={{ margin: '16px 0' }}>
          <p>USER</p>
          <p>newuser@mail.ru</p>
          <p>asd123ASD?</p>
        </div>
        <div style={{ margin: '16px 0' }}>
          <p>ADMIN</p>
          <p>admin@admin.com</p>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
