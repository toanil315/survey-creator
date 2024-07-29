import { QuestionMatrixGrid } from '@/entities/question';

export interface MatrixQuestionViewsProps {
  matrixRows: QuestionMatrixGrid[];
  matrixColumns: QuestionMatrixGrid[];
  name: string;
}
