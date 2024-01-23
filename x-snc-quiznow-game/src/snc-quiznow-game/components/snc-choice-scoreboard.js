import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import Chart from "chart.js/auto";

const { COMPONENT_DOM_READY } = actionTypes;

const view = () => {
	return <canvas id="scoreboard"></canvas>;
};

createCustomElement("snc-choice-scoreboard", {
	renderer: { type: snabbdom },
	view,
	properties: {
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
	},
	actionHandlers: {
		[COMPONENT_DOM_READY]: ({ properties: { choices }, host }) => {
			const data = {
				labels: choices.map((choice) => choice.choice),
				datasets: [
					{
						data: choices.map((choice) => choice.selectedCount),
						backgroundColor: choices.map((choice) =>
							choice.correctAnswer
								? "rgba(75, 192, 192, 0.2)"
								: "rgba(255, 99, 132, 0.2)"
						),
						borderColor: choices.map((choice) =>
							choice.correctAnswer ? "rgb(75, 192, 192)" : "rgb(255, 99, 132)"
						),
						borderWidth: 1,
					},
				],
			};

			const config = {
				type: "bar",
				data,
				options: {
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								stepSize: 1,
							},
						},
					},
					plugins: {
						legend: {
							display: false,
						},
					},
				},
			};

			new Chart(host.shadowRoot.getElementById("scoreboard"), config);
		},
	},
});
