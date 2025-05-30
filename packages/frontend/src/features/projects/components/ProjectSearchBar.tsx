import { useEffect, useState } from 'react';
import { SearchBar } from '../../../shared/components/SearchBar';

export function ProjectSearchBar({
  searchParams,
  setSearchParams,
}: {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}) {
  const [inputValue, setInputValue] = useState(searchParams.get('title') || '');

  useEffect(() => {
    const debounce = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (inputValue) {
        newParams.set('title', inputValue);
      } else {
        newParams.delete('title');
      }
      newParams.set('page', '1');
      setSearchParams(newParams);
    }, 300);

    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <SearchBar
      showClearButton={false}
      placeholder="Search title..."
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  );
}
