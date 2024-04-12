import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerContext, isAuthenticated, errors: errorsRegister } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        registerContext(values);
    })

    return (
        <div>
            {
                errorsRegister.map((error, i) => (
                    <p key={i}>{error}</p>
                ))
            }
            <form action="" onSubmit={onSubmit}>
                <input type="text" {...register('username', { required: true })} placeholder='Username' />
                {
                    errors.username && <p>Username is required</p>
                }
                <input type="email" {...register('email', { required: true })} placeholder='Email' />
                {
                    errors.email && <p>Email is required</p>
                }
                <input type="password" {...register('password', { required: true })} placeholder='Password' />
                {
                    errors.password && <p>Password is required</p>
                }
                <button type="submit">
                    Register
                </button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default RegisterPage;