import { QuestionWithoutSurveyId } from '../types/QuestionWithoutId';

interface QuestionBuilderProps {
  question: QuestionWithoutSurveyId
}

export function QuestionBuilder(props: QuestionBuilderProps) {
  const questionId = `question${props.question.index}`;
  return (
    <div>
      <label htmlFor={questionId}>Question {props.question.index}</label>
      <input id={questionId} name="question[]" placeholder="Enter question..." />
    </div>
  )
}