import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { User } from "../../types/userType";
import { updateUserInStorage } from "../../helpers/storageHelpers";
import { showToast } from "../../helpers/toast";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    defaultValues: user || {},
  });

  useEffect(() => {
    setValue("name", user?.name || "");
    setValue("email", user?.email || "");
    setValue("phone", user?.phone || "");
  }, [user, setValue]);

  const onSubmit = (data: User) => {
    if (user) {
      const result = updateUserInStorage(data);
      if (!result) {
        setUser({ ...user, ...data });
        showToast("Profile Updated", "success");
      } else {
        showToast(result, "error");
      }
    }
  };

  return (
    <div className="profile-container">
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <Form.Group>
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

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            disabled
            isInvalid={!!errors.email}
          />
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

        <Button type="submit">Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
