import AuthIllustration from "../features/auth/components/AuthIllustration";
import RegisterForm from "../features/auth/components/RegisterForm";

export default function Register() {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 h-full items-center max-w-[1080px] m-auto">
      <RegisterForm />
      <AuthIllustration />
    </div>
  );
}
