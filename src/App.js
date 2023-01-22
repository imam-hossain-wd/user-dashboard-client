import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="w-[80%] mx-auto">
      <RouterProvider router={router}/>
      <Toaster/>
    </div>
  );
}

export default App;
