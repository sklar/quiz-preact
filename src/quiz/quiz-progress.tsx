import type { JSX } from 'preact'
import type { Question } from './quiz.controller'

import classes from './quiz.module.css'

interface QuizProgressProps {
	questions: Question[]
}

export function QuizProgress({ questions }: QuizProgressProps): JSX.Element {
	return (
		<p class={classes.result} aria-label="Correct answers of all answers">
			{questions.filter((q) => q.isCorrect).length} of {questions.length}
		</p>
	)
}
