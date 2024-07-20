import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  mergeClasses,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

import { ModalProps } from './types';
import { useModalActionsBaseStyles, useModalBaseStyles, useModalStyles } from './style';

export const Modal = ({
  size = 'small',
  modal,
  title,
  children,
  actions,
  hasCloseIcon = true,
  ...restProps
}: ModalProps) => {
  const modalBaseClassName = useModalBaseStyles();
  const modalActionsClassName = useModalActionsBaseStyles();
  const modalClassNames = useModalStyles();

  return (
    <Dialog
      open={modal.isOpen}
      {...restProps}
    >
      <DialogSurface
        className={mergeClasses(
          modalBaseClassName,
          size === 'xsmall' && modalClassNames.xsmall,
          size === 'small' && modalClassNames.small,
          size === 'medium' && modalClassNames.medium,
          size === 'large' && modalClassNames.large,
        )}
      >
        <DialogBody>
          <DialogTitle
            action={
              hasCloseIcon ? (
                <Button
                  appearance='subtle'
                  icon={<Dismiss24Regular />}
                  onClick={modal.hide}
                />
              ) : null
            }
          >
            {title}
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
          {actions && <DialogActions className={modalActionsClassName}>{actions}</DialogActions>}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
