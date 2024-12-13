'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const adminSignInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function AdminSignIn() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof adminSignInSchema>>({
    resolver: zodResolver(adminSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof adminSignInSchema>) {
    setLoading(true);
    console.log('Admin login attempt:', values);
    setLoading(false);
    router.push("/admin/dashboard");
  }

  return (
    <div className="w-full h-screen bg-[#F5F5F9] flex justify-center items-start overflow-hidden">
      <div className="flex-1 h-screen flex flex-col justify-center items-center">
        <div className="relative w-[1440px] h-[1024px]">
          {/* Top Illustration */}
          <div className="absolute w-[148px] h-[148px] left-[846px] top-[169px]">
            <Image
              src="/images/top-illustration.svg"
              alt="Decoration"
              width={148}
              height={148}
              className="w-full h-full"
            />
          </div>

          {/* Login Card */}
          <div style={{ 
            height: '536.46px',
            left: '495px',
            top: '220px',
            padding: '32px',
            gap: '32px'
          }} 
          className="absolute bg-white rounded-[8px] overflow-hidden shadow-light-elevation-6 flex flex-col justify-center items-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col">
                {/* Header */}
                <div style={{ height: '131px', paddingBottom: '18px', gap: '25px' }}
                     className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/logo.svg"
                      alt="Insight Funders"
                      width={40}
                      height={40}
                      className="-rotate-90"
                    />
                    <div className="text-[26px] font-semibold auth-heading">
                      Insight Funders
                    </div>
                  </div>
                  <div className="w-[394px] text-center auth-text text-[rgba(50,71,92,0.60)]">
                    Admin Portal
                  </div>
                </div>

                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <div className="h-[56px] rounded-[6px] border border-[rgba(50,71,92,0.22)] bg-white px-4">
                          <input
                            type="email"
                            placeholder="Email"
                            className="h-full w-full"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="h-[54px] rounded-[6px] border border-[rgba(50,71,92,0.22)] bg-white flex items-center px-4">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            className="flex-1 h-full"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="ml-2"
                          >
                            {passwordVisible ? (
                              <Eye className="w-6 h-6 text-[rgba(50,71,92,0.54)]" />
                            ) : (
                              <EyeOff className="w-6 h-6 text-[rgba(50,71,92,0.54)]" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                {/* Login Button */}
                <div style={{ height: '42px', borderRadius: '8px' }}
                     className="mt-4 bg-[#696CFF] auth-button-shadow overflow-hidden flex flex-col justify-center items-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-[26px] py-2 w-full h-full"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mx-auto text-white" />
                    ) : (
                      <div className="text-white text-[15px] font-medium auth-text uppercase tracking-[0.46px] leading-[26px]">
                        Login
                      </div>
                    )}
                  </button>
                </div>

                {/* Contact Link */}
                <div className="pt-7 flex justify-center items-center gap-2">
                  <div className="text-center">
                    <button type="button" className="auth-text text-[#696CFF]">
                      Contact
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="py-5 flex items-center gap-2">
                  <div className="flex-1 auth-divider" />
                  <div className="w-9 text-center auth-text text-[rgba(50,71,92,0.87)]">
                    or
                  </div>
                  <div className="flex-1 auth-divider" />
                </div>

                {/* Social Icons */}
                <div className="pt-5 flex justify-center items-center gap-6">
                  {[
                    { name: 'facebook', width: 9.34, height: 18 },
                    { name: 'twitter', width: 19.65, height: 15.96 },
                    { name: 'github', width: 19.95, height: 19.46 },
                    { name: 'google', width: 17.46, height: 17.87 }
                  ].map((social) => (
                    <button
                      key={social.name}
                      type="button"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={`/images/bxl-${social.name}.svg`}
                        alt={social.name}
                        width={social.width}
                        height={social.height}
                        className="w-auto h-auto"
                      />
                    </button>
                  ))}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
