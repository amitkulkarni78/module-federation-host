declare module 'remote/App' {
    const Component: React.ComponentType<any>;
    export default Component;
  }
  declare module "remote/store" {
    import { Store } from "redux";
    const store: Store;
    export default store;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    export { counterReducer, setCounter, handleOpenNavMenu,handleCloseNavMenu }; // ✅ Export actions explicitly

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;
  }

declare module 'products/Products' {
  const Component: React.ComponentType<any>;
  export default Component;
}
declare module "products/store" {
  import { Store } from "redux";
  const store: Store;
  export default store;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  export { productsReducer, handleOpenNavMenu,handleCloseNavMenu }; // ✅ Export actions explicitly

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
}