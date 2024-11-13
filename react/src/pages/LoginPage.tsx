import { FormEvent } from "react";
import authService from "../service/authService";
import { LoginCredentials } from "../types/userInterface";

export default function LoginPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.currentTarget);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as LoginCredentials;
    authService.login(data);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input
        defaultValue="user1@gmail.com"
        className="border"
        name="email"
        id="email"
      />
      <label htmlFor="password">password</label>
      <input
        defaultValue="11"
        className="border"
        name="password"
        id="password"
      />
      <button className="bg-blue-500 p-5">Login</button>
    </form>
  );
}
