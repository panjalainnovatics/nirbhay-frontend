import toast from "react-hot-toast";
// Define the type for the message parameter
type ToastMessage = string;

// Define the type for the successToast function
export const successToast = (message: ToastMessage): string => {
  return toast.success(message, {
    style: {
      background: "green",
      color: "#fff",
    },
  });
};

// Define the type for the errorToast function
export const errorToast = (message: ToastMessage): string => {
  return toast.error(message, {
    style: {
      background: "red",
      color: "#fff",
    },
  });
};