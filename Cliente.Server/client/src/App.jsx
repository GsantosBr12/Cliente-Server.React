
import React from 'react';
import ProductList from './components/ProductList';


function App() {
  return (
    <div className="App">
      <header>
        <h1>Gerenciamento de Produtos</h1>
      </header>
      <main>
        {/* Renderize a lista de produtos, que já inclui o formulário */}
        <ProductList />
      </main>
    </div>
  );
}

export default App;
