import { useAuthStore } from "@/stores/useAuthStore";
import { Eye, EyeOff} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!signupData.username.trim()) return toast.error("Full name is required");
        if (!signupData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(signupData.email)) return toast.error("Invalid email format");
        if (!signupData.password) return toast.error("Password is required");
        if (signupData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSignup = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(signupData);
    };


    

    return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden ">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <img src="spotify.png" alt="spotify logo" className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-green-500 tracking-wider">
              Spotify
            </span>
          </div>

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                </div>

                <div className="space-y-3">
                  {/* username */}
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full bg-zinc-800 border-zinc-700"
                      value={signupData.username}
                      onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input input-bordered w-full  bg-zinc-800 border-zinc-700"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                     <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="input input-bordered w-full  bg-zinc-800 border-zinc-700"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? (
                            <Eye className="size-5 text-base-content/40" />
                        ) : (
                            <EyeOff className="size-5 text-base-content/40" />
                        )}
                    </button>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-full  bg-green-600 rounded-xl" type="submit">
                  {isSigningUp ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Music-bro.png" alt="music illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Listen to the best music</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SignUpPage;