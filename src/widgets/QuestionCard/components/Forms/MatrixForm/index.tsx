import { Col, QuestionForm, Row } from '@/components';
import { QuestionLogicJump } from '../../Logics';
import { MatrixGridSection } from './MatrixGrid';

export const MatrixForm = () => {
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

      <Row gutter={4}>
        <Col span={12}>
          <MatrixGridSection
            label='Rows'
            name='matrixRows'
          />
        </Col>
        <Col span={12}>
          <MatrixGridSection
            label='Columns'
            name='matrixColumns'
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
