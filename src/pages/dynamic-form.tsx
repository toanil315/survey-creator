import { DyanmicFormContainer } from '@/containers/DynamicFormContainer';
import { DynamicFormProvider } from '@/contexts';

export default function DynamicFormPage() {
  return (
    <DynamicFormProvider>
      <DyanmicFormContainer />
    </DynamicFormProvider>
  );
}
