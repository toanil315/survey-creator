import { useEffect, useState } from 'react';

interface Props {
  totalSteps: number;
  currentStep?: number;
}

export type StepStatus = 'finish' | 'process' | 'error' | 'wait';

export const useSteps = ({ totalSteps, currentStep }: Props) => {
  const [current, setCurrent] = useState(currentStep || 0);
  const [total, setTotal] = useState(totalSteps);
  const [status, setStatus] = useState<StepStatus>('process');

  useEffect(() => {
    if (currentStep) setCurrent(currentStep);
  }, [currentStep]);

  useEffect(() => {
    setTotal(totalSteps);
  }, [totalSteps]);

  const next = () => {
    if (current < total) {
      setCurrent(current + 1);
    }
  };

  const back = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const set = (step: number) => {
    if (step >= 0 && step <= total) {
      setCurrent(step);
    }
  };

  const changeStatus = (status: StepStatus) => {
    setStatus(status);
  };

  return { current, total, status, next, back, set, changeStatus };
};
