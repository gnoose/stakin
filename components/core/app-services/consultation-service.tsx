import { ScheduleConsultationDialog } from '../../components/dialogs/schedule-consultation-dialog';
import { useDialog } from '../../components/ui-kit/dialog/dialog-context';
import useGAService from './ga-service';

interface ConsultationService {
  showConsultationDialog: () => void,
}

export default function useConsultationService(): ConsultationService {
  const dialog = useDialog();
  const gaService = useGAService();

  const showConsultationDialog = () => {
    gaService.event('Dialog Opened', 'Consultation Dialog Opened');
    gaService.modalView('Consultation Dialog');
    dialog.openDialog(<ScheduleConsultationDialog/>);
  };

  return { showConsultationDialog };
}
