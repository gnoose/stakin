import { useDialog } from '../../components/ui-kit/dialog/dialog-context';
import { ChooseKitTipDialog } from '../../components/dialogs/choose-kit-tip-dialog';
import useGAService from './ga-service';

interface ChooseKitTipDialogService {
  showChooseKitTipDialog: () => void;
}

export default function useChooseKitTipDialogService(): ChooseKitTipDialogService {
  const dialog = useDialog();
  const gaService = useGAService();

  const showChooseKitTipDialog = () => {
    gaService.event('Dialog Opened', 'Choose Kit Tip Dialog Opened');
    gaService.modalView('Choose Kit Tip Dialog');
    dialog.openDialog(<ChooseKitTipDialog />);
  };

  return { showChooseKitTipDialog };
}
