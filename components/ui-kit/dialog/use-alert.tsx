import {useDialog} from './dialog-context';
import {AlertAction, AlertDialog} from './alert-dialog';
import {DialogResult, DialogType} from './types';

interface AlertService {
  notify: (title: string, message: string, okCaption: string) => Promise<DialogResult>,
  confirm: (title: string, message: string) => Promise<DialogResult>,
  alert: (title: string, message: string, actions: AlertAction[]) => Promise<DialogResult>,
}

export default function useAlert(): AlertService {
  const dialog = useDialog();

  const notify = (title: string, message: string, okCaption: string): Promise<DialogResult> => {
    return new Promise(resolve => {
      dialog.openDialog(<AlertDialog message={message} title={title} okCaption={okCaption}
                                     onClose={res => resolve(res)}/>);
    });
  };

  const confirm = (title: string, message: string): Promise<DialogResult> => {
    return new Promise(resolve => {
      dialog.openDialog(<AlertDialog message={message} title={title} onClose={res => resolve(res)}
                                     type={DialogType.Confirmation}/>);
    });
  };

  const alert = (title: string, message: string, actions: AlertAction[]): Promise<DialogResult> => {
    return new Promise(resolve => {
      dialog.openDialog(<AlertDialog message={message} title={title} actions={actions} onClose={res => resolve(res)}
                                     type={DialogType.Custom}/>);
    });
  };

  return {notify, confirm, alert};
}
