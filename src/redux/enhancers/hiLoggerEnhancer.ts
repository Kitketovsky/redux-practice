import {
  Dispatch,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  AnyAction,
  PreloadedState,
  Reducer,
} from "redux";

// Enhancers are powerful because they can override or replace any of the store's methods: 'dispatch', 'getState' and 'subscribe';

function hiLoggerEnhancer(): StoreEnhancer {
  return (createStore: StoreEnhancerStoreCreator) =>
    <S, A extends AnyAction>(
      reducer: Reducer<S, A>,
      preloadedState?: PreloadedState<S>
    ) => {
      const store = createStore(reducer, preloadedState);

      const dispatch: Dispatch<A> = (action) => {
        console.log("Hi");
        return store.dispatch(action);
      };

      return { ...store, dispatch };
    };
}

export default hiLoggerEnhancer;
