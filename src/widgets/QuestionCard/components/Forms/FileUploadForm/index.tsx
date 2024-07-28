import { Col, QuestionForm, Row } from '@/components';
import { QuestionLogicJump } from '../../Logics';
import { EnumUtils } from '@/utils';
import { FILE_TYPE_ENUM } from '@/constants';

export const FileUploadForm = () => {
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
        label='Limit file types'
        name='limitFileTypes'
        placeholder='Select file types...'
        options={EnumUtils.stringEnumToArray(FILE_TYPE_ENUM).map((item) => ({
          label: item.value,
          value: item.value,
        }))}
        multiselect
      />
      <QuestionForm.Switch
        name='allowMultipleFiles'
        checkedText='Allow multiple files'
        unCheckedText='Allow multiple files'
      />

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
