import { Col, QuestionForm, Row } from '@/components';
import { QuestionLogicJump } from '../../Logics';
import { OptionsSection } from '../Options';

export const MutipleSelectForm = () => {
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

      <OptionsSection />

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
