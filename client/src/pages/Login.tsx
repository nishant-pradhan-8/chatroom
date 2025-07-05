import AuthIllustration from "../features/auth/components/AuthIllustration";
import LoginForm from "../features/auth/components/LoginForm";

export default function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center max-w-[1080px] m-auto">
      <LoginForm />
      <AuthIllustration />
    </div>
  );
}
