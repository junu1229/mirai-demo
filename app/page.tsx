'use client';

import { useLoginStore } from './store/store';
import LoggedIn from './page/LoggedIn';
import UnLoggedIn from './page/UnLoggedIn';


function App() {

  const { isLoggedIn } = useLoginStore();
  return (
    <div className="App">
     {isLoggedIn ? <LoggedIn /> : <UnLoggedIn />}
    </div>
  );
}

export default App;
