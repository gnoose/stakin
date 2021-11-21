import {Children, cloneElement, isValidElement, ReactNode} from 'react';
import Modal from 'react-modal';

import {modalCustomStyles} from './types';

Modal.setAppElement('#__next');

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  children: ReactNode;
}

export function Dialog(props: Props) {
  return (<Modal
    isOpen={props.isOpen}
    style={modalCustomStyles}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    onRequestClose={props.closeDialog}
    closeTimeoutMS={300}
  >
    {Children.map(props.children, child => {
      if (isValidElement(child)) {
        return cloneElement(child, {closeDialog: props.closeDialog});
      }
      return child;
    })}
  </Modal>);
}
