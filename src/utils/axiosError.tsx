export const isAxiosError = (
  error: unknown
): error is { response: { data: { message: string } } } => {
  return (
    (error as { response: { data: { message: string } } }).response?.data
      ?.message !== undefined
  );
};
