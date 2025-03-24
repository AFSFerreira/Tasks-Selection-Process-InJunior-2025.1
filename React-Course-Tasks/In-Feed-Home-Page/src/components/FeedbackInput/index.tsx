import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FeedbackContext } from '../../contexts/feedback-context';
import styles from './styles.module.css';
import { FeedbacksContextType } from '../../@types/feedbacks-context';
import { UserContextType } from '../../@types/user-context';
import { UserContext } from '../../contexts/user-context';
import { FeedbackFormType } from '../../@types/feedback-form-type';

export default function FeedbackInput() {
  const userContext = useContext<UserContextType | null>(UserContext);
  const feedbacksContext = useContext<FeedbacksContextType | null>(FeedbackContext);
  
  const { register, handleSubmit } = useForm<FeedbackFormType>();
  
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [hideOnce, setHideOnce] = useState<boolean>(true);
  
  if (!userContext) {
    return (<p>Error while loading user</p>);
  }
  
  if (!feedbacksContext) {
    return (<p>Error while loading feedbacks</p>);
  }
  
  const { addFeedback } = feedbacksContext;
  const { user } = userContext;

  const handleFocus = () => {
    setIsFocused(true);
    setHideOnce(false);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  }

  const onSubmit: SubmitHandler<FeedbackFormType> = (data: { 'comment-content': string }) => {
    addFeedback({
      id: uuidv4(),
      description: data['comment-content'],
      likes: 0,
      postingTime: new Date(),
      user: user!
    });
    setInputValue('');
  }

  const shouldShowButton = isFocused || inputValue !== '';
  const isSubmitDisabled = inputValue === '';

  return (
    <>
      <div className={styles['feedback-box']}>
        <p>Deixe seu feedback</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('comment-content', {
              required: 'Empty comment. Please, insert some text before commenting',
              onChange: handleChange,
              onBlur: handleBlur
            })}
            onFocus={handleFocus}
            value={inputValue}
            placeholder='Escreva um comentário...'
          />

          <button
            className={`${shouldShowButton ? styles['show-button'] : styles['hide-button']} ${isSubmitDisabled && styles['disabled-submit']}`}
            type="submit"
            style={hideOnce ? {
              opacity: '0',
              animation: 'none'
            } : {}}
            disabled={isSubmitDisabled}
          >
          Comentar
        </button>

        </form>
      </div>
    </>
  );
}
