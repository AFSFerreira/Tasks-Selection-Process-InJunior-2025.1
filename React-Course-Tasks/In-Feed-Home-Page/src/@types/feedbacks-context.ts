import { Feedback } from "./feedback";

export type FeedbacksContextType = {
    feedbacks: Feedback[];
    addFeedback: (newFeedback: Feedback) => void;
    removeFeedback: (feedbackId: string) => void;
}
