import { CloseIcon, Col, FileUploaderProps, QuestionForm, Row } from '@/components';
import { QuestionLogicJump } from '../../Logics';
import { useFileContainerBaseStyles, useFileItemBaseStyles } from './style';

export const PictureSelectionForm = () => {
  const fileContainerBaseClassName = useFileContainerBaseStyles();
  const fileItemBaseClassName = useFileItemBaseStyles();

  const renderPictureItem: FileUploaderProps['renderItems'] = (item, deleteFile) => {
    return (
      <div className={fileItemBaseClassName}>
        <img
          className='file-preview'
          src={item.url}
          alt={item.name}
        />
        <div
          className='close-action'
          onClick={() => deleteFile(item.url)}
        >
          <CloseIcon />
        </div>
      </div>
    );
  };

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
      <div className={fileContainerBaseClassName}>
        <QuestionForm.FileUploader
          label='Images'
          name='pictureSelectOptions'
          required
          multiple
          renderItems={renderPictureItem}
          accept='image/*'
        />
      </div>
      <QuestionForm.Switch
        name='allowMultipleSelect'
        checkedText='Allow Multi Select'
        unCheckedText='Allow Multi Select'
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
