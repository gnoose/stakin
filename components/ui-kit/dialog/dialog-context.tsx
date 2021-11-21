import {createContext, ReactNode, useContext, useState} from 'react';

import {Dialog} from './dialog';

type dialogContextType = {
  openDialog: (dialog: ReactNode) => void,
};

const dialogContextDefaultValues: dialogContextType = {
  openDialog: (_: ReactNode) => {
  },
};

const DialogContext = createContext<dialogContextType>(dialogContextDefaultValues);

export function useDialog() {
  return useContext(DialogContext);
}

type Props = {
  children: ReactNode;
}

export function DialogProvider({children}: Props) {
  const [openStatus, setOpenStatus] = useState<boolean[]>([]);
  const [dialogs, setDialogs] = useState<ReactNode[]>([]);
  const openDialog = (dialog: ReactNode) => {
    setDialogs([...dialogs, dialog]);
    setOpenStatus([...openStatus, true]);
  }
  const closeDialog = (index: number) => {
    const newOpenStatus = [...openStatus];
    newOpenStatus[index] = false;
    setOpenStatus(newOpenStatus);
    // setTimeout(() => {
    //   const openStatusRemoved = [...openStatus];
    //   const dialogsRemoved = [...dialogs];
    //   openStatusRemoved.splice(index, 1);
    //   dialogsRemoved.splice(index, 1);
    //   setOpenStatus(openStatusRemoved);
    //   setDialogs(dialogsRemoved);
    // }, 300);
  };

  const value = {openDialog};

  return (
    <>
      <DialogContext.Provider value={value}>
        {children}
        {dialogs.map((dialog, index) => {
          return <Dialog
            key={index}
            isOpen={openStatus[index]}
            closeDialog={() => closeDialog(index)}
          >{dialog}</Dialog>;
        })}
      </DialogContext.Provider>
    </>
  )
}
