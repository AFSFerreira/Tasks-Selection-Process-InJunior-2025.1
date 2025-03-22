import { useState } from "react";
import { Feedback } from "../@types/feedback";

export default function useFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  function addFeedback(newFeedback: Feedback) {
    setFeedbacks((prev) => [...prev, newFeedback]);
  }

  function removeFeedback(feedbackId: string) {
    console.log("removing");
    setFeedbacks((prev) => {
      return prev.filter(feedback => feedback.id !== feedbackId);
    });
  }

  return { feedbacks, addFeedback, removeFeedback };
}
