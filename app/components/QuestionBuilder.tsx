import { QuestionLocal } from '../types/Questions';

interface QuestionBuilderProps {
  question: QuestionLocal
  callbackDeleteQuestion: () => void
  callbackShiftQuestionOrder: (delta: number) => void
  callbackUpdateQuestionDescription: (newDescription: string) => void
}

export function QuestionBuilder(props: QuestionBuilderProps) {
  const inputId = `question${props.question.localId}`;
  return (
    <div>
      <label htmlFor={inputId}>Question {props.question.localId}</label>
      <input id={inputId} name="question[]" value={props.question.description} placeholder="Enter question..." onChange={(e) => props.callbackUpdateQuestionDescription(e.target.value)}/>
      <button type="button" onClick={() => props.callbackShiftQuestionOrder(-1)}>Up</button>
      <button type="button" onClick={() => props.callbackShiftQuestionOrder(1)}>Down</button>
      <button type="button" onClick={() => props.callbackDeleteQuestion()}>Delete</button>
    </div>
  )
}