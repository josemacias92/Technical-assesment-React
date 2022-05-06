import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Main from "./components/Main/Main";
import UserProvider from "./store/UserProvider";

function App() {
  return (
    <UserProvider>
      <Header />
      <main>
        <Main />
      </main>
      <Footer />
    </UserProvider>
  );
}

export default App;
