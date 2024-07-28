import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

import Input from './Input';
import DatePicker from './DatePicker';
import Select from './Select';
import CheckBox from './CheckBox';
import RadioGroup from './RadioGroup';
import Switch from './Switch';
import Textarea from './Textarea';
import TagPicker from './TagPicker';
import Slider from './Slider';
import FileUploader from './FileUploader';
import CheckboxGroup from './CheckBoxGroup';
import Rating from './Rating';

export const Form = ({
  children,
  ...restProps
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => {
  return (
    <form
      {...restProps}
      noValidate
    >
      {children}
    </form>
  );
};
Form.Input = Input;
Form.DatePicker = DatePicker;
Form.Select = Select;
Form.CheckBox = CheckBox;
Form.RadioGroup = RadioGroup;
Form.Switch = Switch;
Form.Textarea = Textarea;
Form.TagPicker = TagPicker;
Form.Slider = Slider;
Form.FileUploader = FileUploader;
Form.CheckboxGroup = CheckboxGroup;
Form.Rating = Rating;
