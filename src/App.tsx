import { useState } from 'react';

import Header from './components/Layout/Header';
import Main from './components/Main/Main';
import InfoDialog from './components/InfoDialog/InfoDialog';
import UserProvider from './store/UserProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <UserProvider>
      {cartIsShown && <InfoDialog onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Main />
      </main>
    </UserProvider>
  );
}

export default App;
