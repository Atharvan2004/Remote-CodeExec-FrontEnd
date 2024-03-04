import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Action, configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index.ts'
import { Provider } from "react-redux";
import { ThunkAction, thunk } from 'redux-thunk'




const store=configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // apply redux-thunk as a middleware
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <App />
</Provider>
)
