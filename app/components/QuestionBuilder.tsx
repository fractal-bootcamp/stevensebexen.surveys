import { QuestionWithoutSurveyId } from '../types/QuestionWithoutId';

interface QuestionBuilderProps {
  question: QuestionWithoutSurveyId
}

export function QuestionBuilder(props: QuestionBuilderProps) {
  return (
    <div>
      <label htmlFor={`question${props.question.index}`}>Question {props.question.index}</label>
      <input id={`question${props.question.index}`} name={`question${props.question.index}`} placeholder="Enter question..." />
    </div>
  )
}