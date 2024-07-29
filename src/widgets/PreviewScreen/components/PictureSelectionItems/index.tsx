import { CheckIcon } from '@/components';
import { useFormContext } from 'react-hook-form';
import {
  usePictureSelectionContainerBaseClassName,
  usePictureSelectionItemBaseClassName,
  usePictureSelectionItemClassNames,
} from './style';
import { Field, mergeClasses, tokens } from '@fluentui/react-components';
import { PictureSelectionsProps } from './types';

export const PictureSelections = ({
  pictures,
  allowMultipleSelect,
  name,
}: PictureSelectionsProps) => {
  const pictureSelectionContainerBaseClassName = usePictureSelectionContainerBaseClassName();
  const pictureSelectionItemBaseClassName = usePictureSelectionItemBaseClassName();
  const pictureSelectionItemClassNames = usePictureSelectionItemClassNames();

  const form = useFormContext();
  const value: string[] = Array.isArray(form.watch(name)) ? form.watch(name) : [];
  const error = form.formState.errors[name]?.message;

  const handleSelect = (picture: string) => {
    if (allowMultipleSelect) {
      if (value.includes(picture)) {
        form.setValue(
          name,
          value.filter((item) => item !== picture),
          {
            shouldValidate: true,
          },
        );
      } else {
        form.setValue(name, [...value, picture], {
          shouldValidate: true,
        });
      }
    } else {
      form.setValue(name, [picture], {
        shouldValidate: true,
      });
    }
  };

  const renderPictureItems = () => {
    return pictures.map((picture) => (
      <div
        key={picture}
        onClick={() => handleSelect(picture)}
        className={mergeClasses(
          pictureSelectionItemBaseClassName,
          value.includes(picture) && pictureSelectionItemClassNames.selected,
        )}
      >
        <img
          src={picture}
          alt={picture}
        />
        <div className='indicator'>
          {value.includes(picture) && (
            <CheckIcon
              width={18}
              height={18}
              fill={tokens.colorNeutralBackground1}
            />
          )}
        </div>
      </div>
    ));
  };

  return (
    <Field
      {...((Boolean((error as string | undefined)?.trim())
        ? {
            validationState: 'error',
            validationMessage: error,
          }
        : {}) as any)}
    >
      <div className={pictureSelectionContainerBaseClassName}>{renderPictureItems()}</div>
    </Field>
  );
};
