import { makeResetStyles, tokens } from '@fluentui/react-components';

export const useFileContainerBaseStyles = makeResetStyles({
  width: '100%%',

  '& .files-container': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const useFileItemBaseStyles = makeResetStyles({
  position: 'relative',
  width: `calc(50% - ${tokens.spacingHorizontalM} / 2)`,

  '& .file-preview': {
    width: '100%',
    height: '180px',
    borderRadius: tokens.borderRadiusXLarge,
  },

  '& .close-action': {
    position: 'absolute',
    top: '5px',
    right: '5px',

    width: '32px',
    height: '32px',
    borderRadius: tokens.borderRadiusXLarge,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: tokens.colorNeutralBackground1,
    cursor: 'pointer',
  },
});
