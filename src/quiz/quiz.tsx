import party from 'party-js'
import type { JSX } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import { QuizProgress } from './quiz-progress'
import { QuizQuestion } from './quiz-question'
import { QuizResult } from './quiz-result'
import { useQuiz } from './quiz.controller'

import classes from './quiz.module.css'

const celebrationGifs = [
	'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
	'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
	'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
	'https://media.giphy.com/media/l0MYGzh7pUL2SOyty/giphy.gif',
	'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif',
	'https://media.giphy.com/media/cXaeWuJ1oKO4g/giphy.gif',
	'https://media.giphy.com/media/6MMxtt269tcAM/giphy.gif',
	'https://media.giphy.com/media/fwqAg6ZS6ebL2/giphy.gif',
	'https://media.giphy.com/media/DqZKCC1rRht8FmnKbv/giphy.gif',
	'https://media.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif',
	'https://media.giphy.com/media/xDpB3lRInUYla/giphy.gif',
	'https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif',
]

export function Quiz(): JSX.Element {
	const confettiRef = useRef<HTMLDivElement>(null)
	const [celebrationGif, setCelebrationGif] = useState('')

	const {
		answerQuestion,
		currentQuestionIndex,
		generateNewSet,
		isSetComplete,
		questions,
		timeTaken,
	} = useQuiz()

	const handleReload = useCallback(() => {
		setCelebrationGif('')
		generateNewSet()
	}, [generateNewSet])

	useEffect(() => {
		generateNewSet()
	}, [generateNewSet])

	useEffect(() => {
		if (isSetComplete) {
			setCelebrationGif(
				celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)],
			)
			confettiRef.current &&
				party.confetti(confettiRef.current, {
					count: party.variation.range(80, 160),
				})
		}
	}, [isSetComplete])

	const currentQuestion = questions[currentQuestionIndex]

	return (
		<section class={classes.container}>
			<header class={classes.header}>
				<h1>Math Quiz</h1>
			</header>
			<div class={classes.body}>
				{!isSetComplete && currentQuestion && (
					<QuizQuestion question={currentQuestion} onAnswer={answerQuestion} />
				)}
			</div>
			<footer>
				{!isSetComplete ? (
					<QuizProgress questions={questions} />
				) : (
					<QuizResult time={timeTaken} onReload={handleReload} />
				)}
			</footer>
			<div ref={confettiRef} class={classes.confetti} />
			<div
				class={classes.celebrationGif}
				style={{ backgroundImage: `url(${celebrationGif})` }}
			/>
		</section>
	)
}
