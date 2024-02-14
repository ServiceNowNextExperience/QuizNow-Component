import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";

const view = (
	{
		properties: { text, correctAnswer, id, choiceSelected, questionOver },
	},
	{ dispatch }
) => {
	return (
		<button
			type="button"
			on-click={() => dispatch("QUESTION_ANSWERED", { choiceId: id })}
			disabled={choiceSelected}
		>
			{text}
		</button>
	);
};

createCustomElement("snc-choice", {
	renderer: { type: snabbdom },
	view,
	properties: {
		text: {
			default: "avocado",
		},
		correctAnswer: {
			default: false,
		},
		id: {
			default: "tciUgfsgppidn7V7mc6yvzPEr7tm9jSl",
		},
		choiceSelected: {
			default: false,
		},
		questionOver: {
			default: false,
		},
	},
});
