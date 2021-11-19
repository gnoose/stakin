import { useRouter } from 'next/router';
import { useDialog } from '../../components/ui-kit/dialog/dialog-context';
import { FreeDesignConsultationDialog } from '../../components/dialogs/free-design-consultation-form/free-design-consultation-dialog';
import useAlert from '../../components/ui-kit/dialog/use-alert';
import { AlertAction } from '../../components/ui-kit/dialog/alert-dialog';
import { noop } from '../types';
import useGAService from './ga-service';

interface FreeConsultationService {
  showFreeDesignConsultationDialog: () => void,
}

export default function useFreeDesignConsultationService(): FreeConsultationService {
  const router = useRouter();
  const dialog = useDialog();
  const alertService = useAlert();
  const gaService= useGAService();

  const actions: AlertAction[] = [
    {
      caption: 'No, thank you',
      className: 'btn-warning',
      onClick: noop
    },
    {
      caption: 'View Our Signature Kits',
      className: 'btn-primary',
      onClick: () => { router.push('/kits'); }
    }
  ];

  const showFreeDesignConsultationDialog = () => {
    gaService.modalView('Free Design Consultation Dialog');
    dialog.openDialog(<FreeDesignConsultationDialog onClose={(showThankYou) => {
      if (!showThankYou) {
        return;
      }
      alertService.alert(
        'Thank You!',
        'One of our Hardscape Consultants will be in touch soon to discuss your project. In the meantime, would you like to have a look at our Signature Hardscape Kits?',
        actions
      );
    }
    }/>);
  }

  return { showFreeDesignConsultationDialog };
}
