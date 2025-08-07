import axios from 'axios';

const getCsrfToken = async () => {
    const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    return response;
};

// دالة لتسجيل الدخول
const login = async (email, password) => {
    await getCsrfToken();

    try {
        const response = await axios.post(
            'http://localhost:8000/api/login',
            { email, password },
            {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

// دالة للتسجيل
const register = async (name, email, password, passwordConfirmation) => {
    await getCsrfToken();

    try {
        const response = await axios.post(
            'http://localhost:8000/api/register',
            { name, email, password, password_confirmation: passwordConfirmation },
            {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

// تصدير الدوال
export { login, register };
