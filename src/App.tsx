import { useState } from 'react'
import './App.css'

type ItemID = string;

interface Item {
  id: ItemID;
  timestamp: number;
  text: string;
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Videojuegos'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Libros'
  }
]
function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input === null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems((prevItems) => [...prevItems, newItem])


  }

  const createHandleRemoveItem = (id: ItemID) => {
    setItems(prev => {
      return prev.filter(currentItem => {
        return currentItem.id !== id
      })

    })
  }

  return (
    <>
      <main>
        <aside>
          <h1>Prueba técnica de React</h1>
          <h2>Añadir y eliminar elementos de una lista</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Elemento a introducir:
              <input
                name="item"
                required
                type="text"
                placeholder="Videojuegos" />
            </label>
            <button>Añadir elementos a la lista</button>
          </form>
        </aside>
        <section>
          <h2>Lista de elementos</h2>
          <ul>
            {items.length && items.map(item => (
              <li key={item.id}>{item.text}
                <button onClick={() => createHandleRemoveItem(item.id)}>Eliminar elemento</button>
              </li>
            )) || <li>Sin Elementos</li>}
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
