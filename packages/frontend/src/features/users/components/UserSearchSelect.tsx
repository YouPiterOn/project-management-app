import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchSelect } from '../../../shared/components/SearchSelect';
import { usersClient } from '../clients/usersClient';

export function UserSearchSelect({ onSelect }: { onSelect: (id: string) => void }) {
  const [inputValue, setInputValue] = useState('');

  const { data, refetch } = useQuery({
    queryKey: ['assignees', inputValue],
    queryFn: async () => {
      if (!inputValue.trim()) return [];
      const data = await usersClient.getPaginated({
        sortBy: 'email',
        sortOrder: 'ASC',
        page: 1,
        pageSize: 10,
        email: inputValue,
      });
      return data.items;
    },
    enabled: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, refetch]);

  const options = useMemo(
    () =>
      data?.map((user: { id: string; email: string }) => ({
        label: user.email,
        value: user.id,
      })) ?? [],
    [data],
  );

  return (
    <SearchSelect
      label="Assign to"
      options={options}
      value={inputValue}
      onSelect={option => onSelect(option.value)}
      onValueChange={value => setInputValue(value)}
      placeholder="Search by email"
    />
  );
}
