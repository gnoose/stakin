import {stakinIcons} from './icons';
import {noop} from '../../core/types';

interface Props {
  name: string;
  color: string;
  size: number;
  className?: string;
  onClick?: () => void;
}

export default function Icon({name, color, size, className, onClick}: Props) {
  let __html = '';
  const icons = stakinIcons as any;
  if (icons[name]) {
    __html = icons[name](size, color);
  }
  const iconHtml = {__html};
  return (<span className={'inline-block ' + className} dangerouslySetInnerHTML={iconHtml} onClick={onClick}/>);
}

Icon.defaultProps = {
  name: '',
  color: 'primary',
  size: 24,
  onClick: noop,
};
