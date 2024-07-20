import { Switch, SwitchProps } from '@/components/Commons';
import { useFormContext } from 'react-hook-form';
import { CustomController } from './CustomController';

const RHFSwitch = (props: Omit<SwitchProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <CustomController
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
