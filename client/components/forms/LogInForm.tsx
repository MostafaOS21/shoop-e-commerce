"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import { baseApi } from "@/lib/baseApi";
import { useState } from "react";
import { ApiResponse } from "@/types/api";
import { IApiUser } from "@/types/user";
import { logIn } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";
import { ApiError } from "@/lib/api-error";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { AdminForm } from "./AdminForm";
import { apolloClient } from "@/lib/apollo-client";
import { LOGIN_AUTH } from "@/lib/queries/auth.query";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LogInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      console.log({
        ...values,
      });

      const data = await apolloClient.query({
        query: LOGIN_AUTH,
        variables: {
          logInAuthInput: values,
        },
      });

      if (data?.data?.logIn) await logIn(data.data.logIn);
      else throw new Error("Invalid credentials");

      router.push("/");
    } catch (error) {
      let err: any = ApiError.generate(error);

      if (err.status === 404) {
        err.action = (
          <ToastAction
            altText="Sign up"
            onClick={() => router.push("/auth/sign-up")}
          >
            Sign up
          </ToastAction>
        );
      }

      toast(err);
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative z-20 bg-background p-5 rounded-md w-[350px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={isLoading} text="Log in" />

        <div className="flex items-center justify-between xl:hidden">
          <Button asChild type="button" variant={"ghost"}>
            <Link href="/auth/sign-up"> Sign up</Link>
          </Button>

          <AdminForm text="Admin" />
        </div>
      </form>
    </Form>
  );
}
