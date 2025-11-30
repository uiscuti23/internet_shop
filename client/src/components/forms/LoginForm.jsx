import { Link } from 'react-router-dom';
import { LoaderDual } from '../animation/LoaderDual';

const LoginForm = ({ params, hookFormValues }) => {
  const {
    emailReg,
    passwordReg,
    enter,
    isLogin,
    loginEmailErrList,
    loginPassErrList,
    regEmailErrList,
    regPassErrList,
    watchFieldEmail,
    watchFieldPassword,
    loading,
  } = params;

  const { register, errors, isValid, handleSubmit } = hookFormValues;

  const checkErr = (errorsArray, watchedField) => {
    const errorArr = errorsArray.find(item => item[0] === watchedField);
    if (errorArr) {
      return errorArr[1];
    }
    return false;
  };
  const loginEmailErr = checkErr(loginEmailErrList, watchFieldEmail);
  const loginPassErr = checkErr(loginPassErrList, watchFieldPassword);

  const regEmailErr = checkErr(regEmailErrList, watchFieldEmail);
  const regPassErr = checkErr(regPassErrList, watchFieldPassword);

  const emailErr = isLogin ? loginEmailErr : regEmailErr;
  const passwordErr = isLogin ? loginPassErr : regPassErr;

  return (
    <form className='auth-form'>
      <div className='auth-form__item'>
        <label htmlFor='user_email'>Email</label>
        <input
          name='user_email'
          id='user_email'
          {...register('user_email', {
            required: 'Enter your email',
            pattern: {
              value: emailReg,
              message: 'Enter the correct email',
            },
          })}
        />
        {(errors?.user_email || emailErr) && (
          <div className='auth-form__item_error'>
            {errors?.user_email?.message || emailErr || 'Error!'}
          </div>
        )}
      </div>
      <div className='auth-form__item'>
        <label htmlFor='user_password'>
          {isLogin ? <span>Password</span> : <span>Come up with a password</span>}
        </label>
        <input
          name='user_password'
          id='user_password'
          type='password'
          {...register('user_password', {
            required: 'Enter your password',
            minLength: {
              value: 8,
              message: 'Minimum of 8 characters',
            },
            pattern: {
              value: passwordReg,
              message: 'Enter the correct password',
            },
          })}
        />
        {(errors?.user_password || (passwordErr && !emailErr)) && (
          <div className='auth-form__item_error'>
            {errors?.user_password?.message || loginPassErr || 'Error!'}
          </div>
        )}
      </div>
      {isLogin && (
        <div className='auth-form__link-item'>
          <Link to=''>Forgot password?</Link>
        </div>
      )}
      <div className='auth-form__button'>
        <div className='auth-form__loader'>{loading && <LoaderDual />}</div>
        <button onClick={handleSubmit(enter)} disabled={!isValid}>
          {isLogin ? <span>Sign in</span> : <span>Register</span>}
        </button>
      </div>
    </form>
  );
};

export { LoginForm };
