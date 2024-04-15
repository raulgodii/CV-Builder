import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginContext, isAuthenticated, errors: errorsLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(data => {
    loginContext(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return (
    <div>
      {
        errorsLogin.map((error, i) => (
          <p key={i}>{error}</p>
        ))
      }

      <form action="" onSubmit={onSubmit}>
        <input type="email" {...register('email', { required: true })} placeholder='Email' autoComplete="email"/>
        {
          errors.email && <p>Email is required</p>
        }
        <input type="password" {...register('password', { required: true })} placeholder='Password' autoComplete="current-password"/>
        {
          errors.password && <p>Password is required</p>
        }
        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;