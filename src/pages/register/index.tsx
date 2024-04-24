import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Form } from "react-bootstrap";
import { User } from "../../types/userType";
import { signupSchema } from "../../validation/authentication";
import { saveUserToStorage } from "../../helpers/storageHelpers";
import { showToast } from "../../helpers/toast";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // hook form for signup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newUser: User = {
      id: "",
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    const error = saveUserToStorage(newUser);
    if (!error) {
      showToast({
        message: "User registered successfully!",
        variant: "success",
      });
      navigate("/login");
    } else {
      showToast({
        message: error,
        variant: "error",
      });
    }
  };

  return (
    <Container className="login-container">
      <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <Form.Group className="mb-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            {...register("phone")}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
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

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
