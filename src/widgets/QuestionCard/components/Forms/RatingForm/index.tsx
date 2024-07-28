import { Col, QuestionForm, Row } from '@/components';
import { QuestionLogicJump } from '../../Logics';
import { RATING_RANGE_ENUM } from '@/constants';
import { EnumUtils } from '@/utils';
import { useFormContext } from 'react-hook-form';

export const RatingForm = () => {
  const form = useFormContext();

  return (
    <>
      <QuestionForm.Input
        label='Question'
        name='title'
        required
        placeholder='Enter question title...'
      />
      <QuestionForm.Input
        label='Description'
        name='description'
        placeholder='Enter question description...'
      />

      <QuestionForm.Select
        label='Rating Range'
        required
        placeholder='Select rating range'
        name={'range'}
        options={EnumUtils.numericEnumToArray(RATING_RANGE_ENUM).map((item) => ({
          label: item.key,
          value: String(item.value),
        }))}
        onChange={(value: string) => {
          form.setValue(
            'options',
            Array.from({ length: Number(value) }, (_, i) => ({
              value: String(i + 1),
              isOther: false,
            })),
          );
        }}
      />

      <Row gutter={16}>
        <Col span={12}>
          <QuestionForm.Input
            label='Lower Label'
            name='lowerLabel'
          />
        </Col>
        <Col span={12}>
          <QuestionForm.Input
            label='Upper Label'
            name='upperLabel'
          />
        </Col>
      </Row>

      <QuestionLogicJump />

      <hr />
      <Row>
        <Col span={8}>
          <QuestionForm.Switch
            name='required'
            checkedText='Required'
            unCheckedText='Required'
          />
        </Col>
      </Row>
    </>
  );
};
