import { useDialog } from '../../components/ui-kit/dialog/dialog-context';
import { SupplierRequestDialog } from '../../components/dialogs/supplier-request-dialog';
import useGAService from './ga-service';

interface PartnerRequestService {
  showSupplierRequestDialog: () => void,
}

export default function usePartnerRequestService() {
  const dialog = useDialog();
  const gaService = useGAService();

  const showSupplierRequestDialog = () => {
    gaService.event('Dialog Opened', 'Partner Request Dialog Opened');
    gaService.modalView('Partner Request Dialog');
    dialog.openDialog(<SupplierRequestDialog/>);
  }

  return {
    showSupplierRequestDialog
  };
}
