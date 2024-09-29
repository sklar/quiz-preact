import type { JSX } from 'preact'
import { useRef, useState } from 'preact/hooks'
import { type Question, calculateAnswer } from './quiz.controller'

import classes from './quiz.module.css'

interface QuizQuestionProps {
	question: Question
	onAnswer: (isCorrect: boolean) => void
}

export function QuizQuestion({
	question,
	onAnswer,
}: QuizQuestionProps): JSX.Element {
	const [userAnswer, setUserAnswer] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (event: Event) => {
		event.preventDefault()

		if (userAnswer === '') return

		const isCorrect = Number.parseInt(userAnswer) === calculateAnswer(question)

		onAnswer(isCorrect)
		setUserAnswer('')
		inputRef.current?.focus()
	}

	return (
		<form onSubmit={handleSubmit}>
			<p class={classes.question}>
				<span>{question.num1}</span>
				<span>{question.operation}</span>
				<span>{question.num2}</span>
				<span>=</span>
				<input
					type="number"
					placeholder="???"
					value={userAnswer}
					autoFocus
					ref={inputRef}
					onInput={(e) => setUserAnswer((e.target as HTMLInputElement).value)}
				/>
			</p>
		</form>
	)
}
