import { memo } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import { GridToolbarContainer } from '@mui/x-data-grid';

import { Search } from 'lucide-react';

import TextInput from '@/components/ui/form/text-input';

export interface UserTableToolbarProps {
  onSearch: (searchText: string) => void;
}

const UserTableToolbar = ({ onSearch }: UserTableToolbarProps) => {
  return (
    <GridToolbarContainer className="p-3">
      <TextInput
        name="search"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </GridToolbarContainer>
  );
};

export default memo(UserTableToolbar);
