import { AuthFieldProps } from '../../@types/auth-field-props';
import styles from './styles.module.css';

export default function AuthField({ fieldName, fieldType, ...rest }: AuthFieldProps) {
  return (
    <div className={`${styles['auth-field-box']} ${rest.className}`}>
      <label htmlFor={fieldType}>{fieldName}</label>
      <input {...rest} type={fieldType} id={fieldType} />
    </div>
  );
}
