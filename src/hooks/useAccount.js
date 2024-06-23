import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createAccount,
  deleteAccountById,
  readAccountById,
  readAllAccountList,
  updateAccount,
} from '../axios/accountApi';

const apiDict = {
  createAccountMutation,
  deleteAccountByIdMutation,
  readAccountByIdQuery,
  readAllAccountListQuery,
  updateAccountMutation,
};

export default function useAccount(selector, ...rest) {
  const selectedFn = selector(apiDict);
  return selectedFn(...rest);
}

function readAllAccountListQuery() {
  return useQuery({
    queryFn: readAllAccountList,
    queryKey: ['accountList'],
  });
}

function readAccountByIdQuery(accountId) {
  return useQuery({
    queryFn: () => readAccountById(accountId),
    queryKey: ['accountList', accountId],
  });
}

function createAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accountList']);
    },
  });
}

function updateAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => queryClient.invalidateQueries(),
  });
}

function deleteAccountByIdMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccountById,
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
