import { createStore } from "@stencil/store";
import { interpret } from "@xstate/fsm";
import { basketMachine } from "../machines/basket";
import { Build } from "@stencil/core";

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

if (Build.isBrowser) {
  const state = restoreStateFromLocalStorage("basket");
  const initialState = state ? state : basketMachine.initialState;
  basketMachine.initialState = initialState;
}

export const basketService = interpret(basketMachine).start();

basketService.subscribe((state) => {
  basketStore.state.value = state.value;
  basketStore.state.state = state.context;
  if (state.value !== "idle") {
    saveStateToLocalStorage(state);
  }
});

export default basketStore.state;

export const reset = basketStore.reset;
