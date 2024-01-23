import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";

const view = ({ properties: { timeLimit, currentTime } }) => {
	return <progress max={timeLimit} value={currentTime}></progress>;
};

createCustomElement("snc-timer", {
	renderer: { type: snabbdom },
	view,
	properties: {
		timeLimit: {
			default: 20,
		},
		currentTime: {
			default: 0,
		},
	},
});
