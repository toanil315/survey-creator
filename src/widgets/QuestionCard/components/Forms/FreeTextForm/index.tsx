import { Col, QuestionForm, Row } from '@/components';
import { QuestionLogicJump } from '../../Logics';

export const FreeTextForm = () => {
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
      <QuestionForm.Input
        label='Placeholder'
        name='placeholder'
        placeholder='Enter question placeholder...'
      />

      <QuestionLogicJump />

      <hr />
      <Row>
        <Col span={8}>
          <QuestionForm.Switch
            name='isLongText'
            checkedText='Long Text'
            unCheckedText='Long Text'
          />
        </Col>
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
