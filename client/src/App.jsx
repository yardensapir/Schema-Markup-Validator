import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <main className="app">
     <Navbar/>
        <HomePage />
        <Footer/>
    </main>
  );
}

export default App;
