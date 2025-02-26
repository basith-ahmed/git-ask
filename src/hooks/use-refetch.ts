import { useQueryClient } from '@tanstack/react-query'

// For refetching the queries
const useRefetch = () => {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.refetchQueries({
        type: 'active'
    })
  }
}

export default useRefetch