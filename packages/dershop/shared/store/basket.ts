import { createStore } from "@stencil/store";
import { basketMachine } from "../machines/basket";
import { Build } from "@stencil/core";
import { State, interpret } from "xstate";

const saveStateToLocalStorage = (state) => {
  const serializedState = JSON.stringify(state);
  window.localStorage.setItem("basket", serializedState);
};

const restoreStateFromLocalStorage = (key) => {
  const localStorageItem = window.localStorage.getItem(key);
  if (localStorageItem) {
    const parsedValue = JSON.parse(localStorageItem);
    return parsedValue;
  }
  return false;
};
export const basketStore = createStore({
  value: null,
  state: null,
});

let initState;
if (Build.isBrowser) {
  const state = restoreStateFromLocalStorage("basket");
  initState = state ? State.create(state) : basketMachine.initialState;
}
export const basketService = interpret(basketMachine).start(initState);

basketService.subscribe((state) => {
  basketStore.state.value = state.value;
  basketStore.state.state = state.context;
  if (state.value !== "idle") {
    saveStateToLocalStorage(state);
  }
});

export default basketStore.state;

export const reset = basketStore.reset;
