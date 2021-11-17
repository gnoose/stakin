export const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '',
    padding: 0,
  },
  overlay: {
    backgroundColor: 'rgba(7, 163, 157, 0.9)',
    zIndex: 1000,
  }
};

export enum DialogResult {
  Close = 'CLOSE',
  Ok = 'OK',
  Yes = 'YES',
  No = 'NO',
}

export enum DialogType {
  Alert = 'ALERT',
  Confirmation = 'CONFIRMATION',
  Custom = 'CUSTOM',
}
