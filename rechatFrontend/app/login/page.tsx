"use client";
import { useForm } from "react-hook-form";
import { loginUserSchema, loginUserType } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserType>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: loginUserType) => {
    console.log(data);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", data);
      console.log("response", res);
      localStorage.setItem("useremail", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/chat");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Email</Label>
        <Input {...register("email")} className="w-60" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <Label>Password</Label>
        <Input type="password" {...register("password")} className="w-60" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <Button variant="outline" type="submit">
        Button
      </Button>
    </form>
  );
}
