import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./user-auth-form";

export default function AuthenticationPage({
  title,
  description,
  value,
  authFor,
}: {
  title: string;
  description: string;
  value: string;
  authFor: string;
}) {
  return (
    <>
      <div className="container relative grid h-[750px] flex-col items-center justify-center xl:max-w-none xl:grid-cols-2 xl:px-0 ">
        <div className=" flex items-center justify-center xl:hidden">
          <Link to="/">
            <img
              src="/src/assets/images/logo.png"
              className="w-36 h-10 md:w-52 md:h-12 lg:w-52 lg:h-16 xl:w-48 xl:h-48"
              alt="FlexiLearn Logo"
            />
          </Link>
        </div>
        <Link
          to={value === "Login" ? "/login" : "/signup"}
          className={cn(
            buttonVariants({ variant: "default" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {value}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r xl:flex">
          <div className=" absolute inset-0 hidden bg-red-500 lg:flex" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link to="/">
              <img
                src="/src/assets/images/flexiLearn.png"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-40 xl:h-36"
                alt="FlexiLearn Image"
              />
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo; FlexiLearn will change the definitions of learning and
                will help you to learn the way human brain works. &rdquo;
              </p>
              <footer className="text-sm italic">FlexiLearn Team</footer>
            </blockquote>
          </div>
        </div>
        <div className="-mt-64 lg:p-8 xl:-mt-20">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="p-4 text-xs text-muted-foreground sm:p-0 sm:text-sm">
                {description}
              </p>
            </div>
            <UserAuthForm authFor={authFor} />
            <p className="px-4 text-center text-xs text-muted-foreground sm:px-8 sm:text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
