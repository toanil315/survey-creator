import { FIELD_TYPE_ENUM } from '@/constants';
import { FieldCardProps } from './type';
import { FreeTextForm } from './components/Forms/FreeTextForm';
import { Accordion, QuestionForm } from '@/components';
import {
  useFieldCardBaseClassName,
  useFieldFormContainerBaseClassName,
  useFieldOrderBaseClassName,
} from './style';
import { FormProvider, useForm } from 'react-hook-form';
import { memo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SingleSelectForm } from './components/Forms/SingleSelectForm';
import { useDynamicForm } from '@/hooks';
import { mergeClasses } from '@fluentui/react-components';
import { Field, FieldSchema } from '@/entities/field';

export const FieldCard = memo(
  ({ field }: FieldCardProps) => {
    const fieldCardBaseClassName = useFieldCardBaseClassName();
    const fieldOrderBaseClassName = useFieldOrderBaseClassName();
    const fieldFormContainerBaseClassName = useFieldFormContainerBaseClassName();

    const { updateField, changeCurrentField } = useDynamicForm();

    const form = useForm<Field>({
      defaultValues: field,
      resolver: zodResolver(FieldSchema),
    });

    useEffect(() => {
      form.reset(field);
    }, [field]);

    const onSubmit = (value: Field) => updateField(value);

    const renderFieldOrder = () => {
      return field.order;
    };

    return (
      <FormProvider {...form}>
        <div
          className={fieldCardBaseClassName}
          onClick={() => changeCurrentField(field.id)}
        >
          <div className={mergeClasses(fieldOrderBaseClassName)}>{renderFieldOrder()}</div>
          <Accordion
            style={{ flex: 1 }}
            items={[
              {
                key: field.id,
                title: field.title,
                container: (
                  <QuestionForm
                    onSubmit={form.handleSubmit(onSubmit)}
                    noValidate
                    className={fieldFormContainerBaseClassName}
                    formId={field.id}
                  >
                    <FieldFormFactory field={field} />
                  </QuestionForm>
                ),
                helperText: <p>{form.watch('required') ? 'Required' : 'Optional'}</p>,
              },
            ]}
            accordionIcon={{
              expand: null,
              collapse: null,
            }}
          />
        </div>
      </FormProvider>
    );
  },
  (prev, next) => JSON.stringify(prev.field) === JSON.stringify(next.field),
);

export const FieldFormFactory = ({ field }: FieldCardProps) => {
  switch (field.type) {
    case FIELD_TYPE_ENUM.FREE_TEXT: {
      return <FreeTextForm />;
    }

    case FIELD_TYPE_ENUM.SINGLE_SELECT: {
      return <SingleSelectForm />;
    }
  }
};
