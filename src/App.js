import React, { useState } from "react";



function App() {

const  [items, setItems] = useState([])

function addNewItem(item){
  setItems((prevItems) => [...prevItems, item])
}

function deleteItem(id){
  setItems(items => items.filter(item => item.id !== id))
}

function handleChecked(id){
  setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item))
}

  return (
    <div className="app">
      <Logo />
      <Form addNewItem={addNewItem}/>
      <PackingList items={items} deleteItem={deleteItem} handleChecked={handleChecked}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴FAR AWAY💼</h1>;
}



function Form({addNewItem}) {

const [inputValue, setInputValue] = React.useState('')
const [quantity, setQuantity] = React.useState(1)

function handleSubmit(e){
  e.preventDefault()
 


  if(!inputValue) return;

  const newItem ={
    description: inputValue, quantity, packed: false, id: Date.now()
  }
  console.log(newItem);
  
  addNewItem(newItem)

  setInputValue('')
  setQuantity(1)
 


}

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need fror your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
        </select>
      <input value={inputValue} type="text" placeholder="Item..." onChange={(e) => {
        setInputValue(e.target.value) 
        console.log(e.target.value)
        }} >

        </input>
      <button>Add</button>
    </form>
  );
}

function PackingList({items, deleteItem, handleChecked}) {
  return (
    <div  className="list">
      <ul>
      {items.map((item) => (
        <Item item={item} key={item.id} deleteItem={deleteItem} handleChecked={handleChecked}/>
        ))}
    </ul>
    </div>
  )
}

function Item({item, deleteItem, handleChecked}){
  return(
    <li>
      <input type="checkbox" value={item.packed} onChange={() => {handleChecked(item.id)}}/>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
      {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list</em>
    </footer>
  );
}

export default App;
