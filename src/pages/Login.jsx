import { useState } from "react";
import ForgotPasswordForm from "../components/Login/ForgotPasswordForm";
import LoginForm from "../components/Login/LoginForm";
import SignUpForm from "../components/Login/SignUpForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-2 flex items-center justify-center">
      {isForgotPassword ? (
        <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />
      ) : isLogin ? (
        <LoginForm
          setIsLogin={setIsLogin}
          setIsForgotPassword={setIsForgotPassword}
        />
      ) : (
        <SignUpForm setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Login;
