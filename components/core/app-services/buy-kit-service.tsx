import { useDialog } from '../../components/ui-kit/dialog/dialog-context';
import { BuyKitDialog } from '../../components/dialogs/buy-kit-dialog';
import useGAService from './ga-service';

interface BuyKitService {
  buy: (kitName: string) => void,
}

export default function useBuyKitService(): BuyKitService {
  const gaService = useGAService();
  const dialog = useDialog();

  const buy = (kitName: string) => {
    gaService.event('Dialog Opened', 'Buy Kit Dialog Opened');
    gaService.modalView('Buy Kit Dialog');
    dialog.openDialog(<BuyKitDialog kitName={kitName}/>);
  };

  return { buy };
}
