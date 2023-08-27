import { FunctionComponent } from 'react';
import { signIn } from 'next-auth/react';
interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  async function Login() {
    await signIn('google');
  }
  return (
    <div>
      <button
        onClick={() => {
          Login();
        }}
      >
        Login with google
      </button>
    </div>
  );
};

export default Login;
