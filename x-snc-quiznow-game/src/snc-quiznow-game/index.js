import { createCustomElement } from "@servicenow/ui-core";
import snabbdom, { Fragment } from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "./components/snc-choice";
import "./components/snc-choice-scoreboard";
import "./components/snc-timer";

const view = ({
	properties: {
		mode,
		question,
		choices,
		timeLimit,
		timeElapsed,
		choiceSelected,
		questionOver,
		showScoreBoard,
	},
}) => {
	return (
		<Fragment>
			<header>
				<h1>
					<span>Question:</span>
					<span>{question}</span>
				</h1>
			</header>
			<main>
				{mode === "presenter" && !questionOver ? (
					<section>
						<snc-timer
							timeLimit={timeLimit}
							currentTime={timeElapsed}
						></snc-timer>
					</section>
				) : null}
				{mode === "presenter" && questionOver && showScoreBoard ? (
					<section>
						<snc-choice-scoreboard choices={choices}></snc-choice-scoreboard>
					</section>
				) : null}
				{!showScoreBoard || mode === "player" ? (
					<section>
						<ul>
							{choices.map(({ choice, correctAnswer, sysId }) => {
								return (
									<li>
										<snc-choice
											choice={choice}
											correctAnswer={correctAnswer}
											sysId={sysId}
											choiceSelected={choiceSelected}
											questionOver={questionOver}
										></snc-choice>
									</li>
								);
							})}
						</ul>
					</section>
				) : null}
			</main>
		</Fragment>
	);
};

createCustomElement("snc-quiznow-game", {
	renderer: { type: snabbdom },
	view,
	styles,
	properties: {
		mode: {
			default: "presenter",
		},
		question: {
			default: "What is 1+1?",
		},
		choices: {
			default: [
				{
					choice: "1",
					correctAnswer: false,
					selectedCount: 0,
					sysId: "zQD4wptaJrPBunMkD72ccmW3p8vjj9Sy",
				},
				{
					choice: "2",
					correctAnswer: false,
					selectedCount: 0,
					sysId: "ucOcIDn0xrKvZf4uDSz6OdjFyHtvHjz8",
				},
				{
					choice: "3",
					correctAnswer: false,
					selectedCount: 0,
					sysId: "m7MT04eEM168F1EQtIsZXDtJW6479fP7",
				},
				{
					choice: "avocado",
					correctAnswer: true,
					selectedCount: 0,
					sysId: "w1ntjJu3aq76seCBNGRB8r7XnnoHBY41",
				},
			],
		},
		timeLimit: {
			default: 20,
		},
		timeElapsed: {
			default: 0,
		},
		choiceSelected: {
			default: false,
		},
		questionOver: {
			default: false,
		},
		showScoreBoard: {
			default: false,
		},
	},
	actionHandlers: {
		QUESTION_ANSWERED: ({ properties: { mode }, action, dispatch }) => {
			if (mode === "player") dispatch("CHOICE_SELECTED", { ...action.payload });
		},
	},
});