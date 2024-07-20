import { Switch, SwitchProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFSwitch = (props: Omit<SwitchProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field }) => (
        <Switch
          {...props}
          {...field}
        />
      )}
      name={props.name || ''}
      control={control}
    />
  );
};

export default RHFSwitch;
