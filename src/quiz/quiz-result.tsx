import type { JSX } from 'preact'

import classes from './quiz.module.css'

interface QuizResultProps {
	time: number
	onReload: () => void
}

export function QuizResult({ time, onReload }: QuizResultProps): JSX.Element {
	return (
		<p class={classes.result}>
			<time
				class={classes.timer}
				aria-label="Time to complete the questions set"
			>
				{time.toFixed(0)} seconds
			</time>
			<button
				type="button"
				class={classes.button}
				aria-label="Load another set of questions"
				onClick={onReload}
			>
				Reload
			</button>
		</p>
	)
}
