import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { AxiosResponse } from "axios";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  authFor: string;
}

export function UserAuthForm({
  className,
  authFor,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const navigate = useNavigate();
  // Adjusted to use useParams for React Router
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType");

  console.log(userType);
  useEffect(() => {
    // Assuming `userType` is a path parameter, adjust according to your routing setup
    if (
      userType === "student" ||
      userType === "teacher" ||
      userType === "parent"
    ) {
      localStorage.setItem("userType", userType);
    }
  }, [userType]); // Adjusted dependency to match React Router's useParams

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please enter all fields");
      setIsLoading(false);
      return;
    }

    if (authFor === "login") {
      try {
        const response = (await auth(authFor, email, password, userType || "")) as AxiosResponse;
        setIsLoading(false);
        setAuth(response.data);

        // Redirect based on the user's role
        const { role } = response.data;
        if (role === "admin") {
          navigate(`/dashboard`);
        } else if (role === "student" || role === "teacher" || role === "parent") {
          navigate(`/profile/${role}`);
        } else {
          // Handle other roles or fallback
          navigate(`/`);
        }

        toast.success("Login Successful");

      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          // Here you can check for specific error messages if you like
          toast.error(error.message);
        } else {
          toast.error("Login Failed");
        }
      }
    } else if (authFor === "signup") {
      try {
        const response = (await auth(
          authFor,
          email,
          password,
          userType || ""
        )) as AxiosResponse;
        setIsLoading(false);
        setAuth(response.data);
        toast.success("SignUp Successful. Please Login");
        setTimeout(() => {
          navigate(`/login`);
        }, 2000);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          // Here you can check for specific error messages if you like
          toast.error(error.message);
        } else {
          toast.error("Some error occured please retry");
        }
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Toaster />
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              className="mt-2"
            />
          </div>
          <Button
            disabled={isLoading}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            {isLoading && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            {authFor == "signup" ? "Sign up with Email" : "Login with Email"}
          </Button>
        </div>
      </form>

      {authFor == "login" ? (
        <Link to="/forgot-password">
          <div className="text-sm text-center text-muted-foreground hover:underline">
            Forgot password?
          </div>
        </Link>
      ) : null}
    </div>
  );
}
