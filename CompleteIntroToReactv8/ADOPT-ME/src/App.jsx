
import { createRoot } from 'react-dom/client';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchParams from './SearchParams';
import Details from './Details';
import { useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';

// import Pet from "./Pet.jsx";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       animal: "Dog",
//       name: "Luna",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, {
//       animal: "Lion",
//       name: "Rawr",
//       breed: "African Lion",
//     }),
//     React.createElement(Pet, {
//       animal: "Tiger",
//       name: "Raja",
//       breed: "Malayan Tiger",
//     }),
//   ]);
// };

// const App = () => {
//   <div>
//     <h1>Adopt Me!</h1>
//     <Pet name="Luna" animal="Dog" breed="Havanese" />
//     <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
//     <Pet name="Doink" animal="Cat" breed="Mixed" />
//   </div>
// }

// const App = () => {
//   return (
//     <div>
//       <h1>Adopt Me!</h1>
//       <SearchParams />
//     </div>
//   )
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  }
})

const App = () => {
  const adoptedPet = useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          
          <Routes>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="" element={<SearchParams/>}/>
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
// const root = ReactDOM.createRoot(container);
// root.render(React.createElement(App));
