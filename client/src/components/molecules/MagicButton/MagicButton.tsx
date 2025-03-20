import styles from './/MagicButton.module.css';
import { useNavigate } from 'react-router-dom';

interface MagicButtonProps {
  text: string;
}

export default function MagicButton({ text }: MagicButtonProps) {
  const navigate = useNavigate();
  const signupClickHandler = () => {
    navigate('/signup');
  };

  return (
    <button className={styles.shinycta}>
      <span onClick={signupClickHandler}>{text}</span>
    </button>
  );
}
