import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);
  return { isOpen, toggle, show, hide };
};
