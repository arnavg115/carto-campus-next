import { Context, createWrapper } from "next-redux-wrapper";
import { createStore, Store } from "redux";
import { mainReducer } from "./reducer";
import { State } from "./types";

const makeStore = (context: Context) => createStore(mainReducer);

const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });

export { wrapper };
