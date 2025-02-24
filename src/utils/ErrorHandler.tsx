import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const handleAxiosError = (error: unknown, router: any) => {
  if (!(error instanceof AxiosError)) return;

  const { response } = error;

  if (response) {
    const { status, data } = response;

    // Map status codes to error messages or actions
    const statusActions: Record<number, () => void> = {
      401: () => {
        toast.error(data.data || 'Unauthorized');
        router.push('/');
      },
      400: () => toast.error(data.data || 'Bad Request'),
      402: () => toast.error(data.data),
      403: () => toast.error(data.data || 'Forbidden'),
      404: () => toast.error(data.data || 'Not Found'),
    };

    // Execute the corresponding action for the status code
    const action = statusActions[status];
    if (action) action();
  } else {
    toast.error('An unknown error occurred');
  }
};
