import { QuestionWithoutSurveyId } from '../types/QuestionWithoutId';

interface QuestionBuilderProps {
  question: QuestionWithoutSurveyId
}

export function QuestionBuilder(props: QuestionBuilderProps) {
  return (
    <div>
      <label >Question {props.question.index}</label>
      <input name="question[]" placeholder="Enter question..." />
    </div>
  )
}