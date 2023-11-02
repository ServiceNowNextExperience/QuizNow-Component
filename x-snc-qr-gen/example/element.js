import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import '../src/snc-qr-gen';

const initialState = {};

const view = (state, { updateState }) => {
   return (<div id="main">
      <snc-qr-gen></snc-qr-gen>
   </div>)
};

createCustomElement("example-element", {
   initialState: initialState,
   renderer: { type: snabbdom },
   view,
   actionHandlers: {},
});

const el = document.createElement("main");
document.body.appendChild(el);

el.innerHTML = "<example-element/>";
