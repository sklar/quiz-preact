import type { ComponentType } from 'preact'
import type { Question } from './quiz.controller'

import classes from './quiz.module.css'

interface QuizProgressProps {
	questions: Question[]
}

export const QuizProgress: ComponentType<QuizProgressProps> = ({
	questions,
}) => {
	return (
		<p class={classes.result} aria-label="Correct answers of all answers">
			{questions.filter((q) => q.isCorrect).length} of {questions.length}
		</p>
	)
}
