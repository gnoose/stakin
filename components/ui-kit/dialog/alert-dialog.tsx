import {DialogResult, DialogType} from './types';
import Icon from '../icon';

export interface AlertAction {
  caption: string;
  onClick: () => void;
  className: 'btn-warning' | 'btn-primary' | 'btn-danger' | 'btn-secondary' | 'btn-info';
}

interface Props {
  title: string,
  okCaption: string,
  message: string,
  type: DialogType,
  onClose: (res: DialogResult) => void,
  closeDialog: () => void, // DO NOT USE THIS. INTERNAL USE ONLY
  actions?: AlertAction[];
}

export function AlertDialog({title, message, type, okCaption, onClose, closeDialog, actions}: Props) {
  const closeWithResult = (result: DialogResult) => {
    closeDialog();
    onClose(result);
  }

  return (<div className="w-500 p-20">
    <div className="flex justify-end">
      <button className="px-5 pt-5" onClick={() => {
        closeDialog();
        onClose(DialogResult.Close)
      }}><Icon name="close" color="#2c2c2c" size={14}/></button>
    </div>
    <h5 className="text-light-500 text-center text-22 font-medium mb-15">{title}</h5>
    <p className="text-light-500 text-16 font-normal text-center mb-30 px-10 lg:px-30">{message}</p>
    <div className="flex justify-center py-10">
      {type === DialogType.Alert &&
      <button className="btn btn-primary btn-md" onClick={() => closeWithResult(DialogResult.Ok)}>{okCaption}</button>
      }
      {type === DialogType.Confirmation && (<>
        <button className="btn btn-danger btn-md mr-30" onClick={() => closeWithResult(DialogResult.Yes)}>Yes</button>
        <button className="btn btn-info btn-md" onClick={() => closeWithResult(DialogResult.No)}>No</button>
      </>)}
      {type === DialogType.Custom && (<>
        {actions?.map((action, index) => <button
          key={index}
          className={'btn btn-md mx-15 ' + action.className}
          onClick={() => {
            closeDialog();
            action.onClick();
          }}
        >{action.caption}</button>)}
      </>)}
    </div>
  </div>);
}

AlertDialog.defaultProps = {
  okCaption: 'Ok',
  type: DialogType.Alert,
  onClose: () => {
  },
  closeDialog: () => {
  },
  actions: [],
}
