import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";

const view = (
	{
		properties: { choice, correctAnswer, sysId, answerSelected, questionOver },
	},
	{ dispatch }
) => {
	return (
		<button
			type="button"
			on-click={() => dispatch("QUESTION_ANSWERED", { choiceId: sysId })}
			disabled={answerSelected}
		>
			{choice}
		</button>
	);
};

createCustomElement("snc-choice", {
	renderer: { type: snabbdom },
	view,
	properties: {
		choice: {
			default: "avocado",
		},
		correctAnswer: {
			default: false,
		},
		sysId: {
			default: "tciUgfsgppidn7V7mc6yvzPEr7tm9jSl",
		},
		answerSelected: {
			default: false,
		},
		questionOver: {
			default: false,
		},
	},
});
