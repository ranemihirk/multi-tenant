"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Types for the form
type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});

  function validate(values: LoginForm) {
    const e: Partial<LoginForm> = {};
    if (!values.email) e.email = "Email is required";
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(values.email))
      e.email = "Invalid email";

    if (!values.password) e.password = "Password is required";
    else if (values.password.length < 6)
      e.password = "Password must be at least 6 characters";

    return e;
  }

  async function handleSubmit() {
    console.log("handleSubmit: ");
    // ev?.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false, // prevent automatic navigation
      });
      // Success: optionally refresh/app-router redirect
      setOpen(false);
      // If you want to refresh server components or protected pages:

      toast.success({ title: "Signed in", description: "Welcome back!" });
    } catch (err: any) {
      console.error(err);
      toast.error({
        title: "Sign in failed",
        description: err.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("loading: ", loading);
    console.log("form: ", form);
    console.log("errors: ", errors);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                onChange={(e) => {
                  console.log("onChange email: ", e.target.value);
                  setForm((s) => ({ ...s, email: e.target.value }));
                }}
                placeholder="name@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                onChange={(e) => {
                  console.log("onChange password: ", e.target.value);
                  setForm((s) => ({ ...s, password: e.target.value }));
                }}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <a className="text-sm underline-offset-4 hover:underline cursor-pointer">
            Forgot password?
          </a>
        </div>
        <Button className="w-full cursor-pointer" onClick={handleSubmit}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        <DialogFooter></DialogFooter>
        <Separator className="my-2" />

        <div className="text-center text-sm">
          Don’t have an account?{" "}
          <a className="underline cursor-pointer">Create one</a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
