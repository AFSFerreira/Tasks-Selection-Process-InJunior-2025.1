import { createContext } from "react";
import useFeedback from "../hooks/useFeedback";
import { FeedbacksContextType } from "../@types/feedbacks-context";

export const FeedbackContext = createContext<FeedbacksContextType | null>(null);

export function FeedbackProvider({ children }: { children?: React.ReactNode }) {
  const { feedbacks, addFeedback, removeFeedback } = useFeedback();

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, removeFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}
