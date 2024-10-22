import { createRequest, IAction } from '@/utils/api';
import { useState } from 'react';
import { IUseCrudRequest } from '@/constants/types';

export default function useCrudRequest(
  action: IAction,
  { onComplete, onError, onSuccess, revalidateCache }: IUseCrudRequest = {}
) {
  // STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any[]>([]);

  // FUNCTIONS
  const submitRequest = async (body: object) => {
    setLoading(true);

    const request = await createRequest(action, body);

    setData(request.data);
    setErrors(request.errors);
    setLoading(false);

    await onComplete?.(request.data, request.errors);

    if (request.errors.length) {
      await onError?.(request.errors);
    }

    if (!request.errors.length) {
      await onSuccess?.(request.data);
      await revalidateCache?.();
    }
  };

  const resetRequest = () => {
    setData({});
    setErrors([]);
    setLoading(false);
  };

  return {
    data,
    loading,
    errors,
    onSuccess,
    resetRequest,
    submitRequest,
  };
}
