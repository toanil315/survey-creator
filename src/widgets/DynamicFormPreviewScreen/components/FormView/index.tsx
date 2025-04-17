import { Col, QuestionForm, Row } from '@/components';
import { FIELD_TYPE_ENUM } from '@/constants';
import { useDynamicForm } from '@/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { useFormTitleBaseClassName } from './style';
import { useEffect } from 'react';
import { EvaluateVisibilityLogic } from './EvaluateVisibilityLogic';

export const FormView = () => {
  const titleBaseClassName = useFormTitleBaseClassName();

  const form = useForm();
  const { fields } = useDynamicForm();

  function resetDefaultValues() {
    const defaultValues = fields.reduce<Record<string, string | undefined>>(
      (defaultValues, currentField) => {
        switch (currentField.type) {
          case FIELD_TYPE_ENUM.FREE_TEXT: {
            defaultValues[currentField.id] = '';
            break;
          }
          case FIELD_TYPE_ENUM.SINGLE_SELECT: {
            defaultValues[currentField.id] = undefined;
            break;
          }
        }

        return defaultValues;
      },
      {},
    );
    form.reset(defaultValues);
  }

  useEffect(() => {
    resetDefaultValues();
  }, [fields, form]);

  function renderFields() {
    return fields.map((f) => {
      switch (f.type) {
        case FIELD_TYPE_ENUM.FREE_TEXT: {
          return (
            <Col span={12}>
              <EvaluateVisibilityLogic fieldId={f.id}>
                <QuestionForm.Input
                  label={f.title}
                  required
                  placeholder={`Enter ${f.title}`}
                  name={f.id}
                />
              </EvaluateVisibilityLogic>
            </Col>
          );
        }

        case FIELD_TYPE_ENUM.SINGLE_SELECT: {
          return (
            <Col span={12}>
              <EvaluateVisibilityLogic fieldId={f.id}>
                <QuestionForm.Select
                  label={f.title}
                  required
                  placeholder={`Select ${f.title}`}
                  name={f.id}
                  options={f.options.map((o) => ({
                    label: o.value,
                    value: o.value,
                  }))}
                />
              </EvaluateVisibilityLogic>
            </Col>
          );
        }
      }
    });
  }

  return (
    <FormProvider {...form}>
      <h1 className={titleBaseClassName}>Dynamic Form</h1>
      <QuestionForm
        onSubmit={form.handleSubmit(console.log)}
        noValidate
        formId='1'
      >
        <Row gutter={[16, 16]}>{renderFields()}</Row>
      </QuestionForm>
    </FormProvider>
  );
};
