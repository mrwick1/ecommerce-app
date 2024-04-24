import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Form } from "react-bootstrap";
import { getUsersFromStorage } from "../../helpers/storageHelpers";
import { loginSchema } from "../../validation/authentication";
import { showToast } from "../../helpers/toast";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInput {
  emailOrPhone: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { setUser, setAuthenticated } = useUser();
  const navigate = useNavigate();
  // hook form for login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    const users = getUsersFromStorage();
    const userFound = users.find(
      (user) =>
        (user.email === data.emailOrPhone ||
          user.phone === data.emailOrPhone) &&
        user.password === data.password
    );

    if (userFound) {
      showToast("Login successful", "success");
      setUser(userFound);
      setAuthenticated(true);
      navigate("/");
    } else {
      showToast("Invalid credentials", "error");
    }
  };

  return (
    <Container className="login-container">
      <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center mb-4">User Login</h3>

        <Form.Group className="mb-4 ">
          <Form.Label>Email or Phone</Form.Label>
          <Form.Control
            type="text"
            {...register("emailOrPhone")}
            isInvalid={!!errors.emailOrPhone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.emailOrPhone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4 ">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="form-button">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
