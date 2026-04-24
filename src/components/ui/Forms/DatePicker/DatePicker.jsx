import { Box } from '@mui/material';
import { DatePicker as BaseDatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';

const DatePicker = ({
  control,
  name,
  label,
  defaultValue,
  helperText,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue === undefined ? null : defaultValue}
      render={({ field }) => {
        const { value, onChange, onBlur } = field;

        const handleDateChange = (newValue) => {
          // Pastikan value tetap Dayjs atau null, jangan string
          onChange(newValue === null ? null : newValue);
        };

        return (
          <Box
            sx={{
              marginBottom: 2,
            }}
          >
            <BaseDatePicker
              {...props}
              label={label}
              value={value ?? null}
              onChange={handleDateChange}
              onBlur={onBlur}
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText,
                  onBlur,
                },
              }}
            />
          </Box>
        );
      }}
    />
  );
};

export default DatePicker;
