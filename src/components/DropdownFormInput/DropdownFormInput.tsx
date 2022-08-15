import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  name: string;
  selections: string[];
  getSelection(arg0: string): void;
}

function DropdownFormInput({ name, selections, getSelection }: Props) {
  const [selection, setSelection] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value);
    getSelection(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-simple-select-autowidth-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selection}
          onChange={handleChange}
          autoWidth
          label={name}
        >
          {selections.length == 0 ? (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          ) : (
            selections.map((element) => (
              <MenuItem key={element} value={element}>
                {element}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default DropdownFormInput;
