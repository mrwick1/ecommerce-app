import { toast } from "sonner";

export const showToast = (
  message?: string,
  variant?: "success" | "error" | "warning" | "loading"
) => {
  switch (variant) {
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
};
