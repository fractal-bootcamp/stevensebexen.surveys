import { QuestionWithoutSurveyId } from '../types/QuestionWithoutId';

interface QuestionBuilderProps {
  question: QuestionWithoutSurveyId
}

export function QuestionBuilder(props: QuestionBuilderProps) {
  const inputId = `question${props.question.index}`;
  return (
    <div>
      <label htmlFor={inputId}>Question {props.question.index}</label>
      <input id={inputId} name="question[]" placeholder="Enter question..." />
    </div>
  )
}