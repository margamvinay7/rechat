"use client";
import { useForm } from "react-hook-form";
import { userSchema, UserType } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserType) => {
    console.log(data);
    // Handle form submission
    try {
      const res = await axios.post("http://localhost:3000/auth/register", data);
      console.log("response", res);
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Name</Label>
        <Input {...register("username")} className="w-60" />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

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
