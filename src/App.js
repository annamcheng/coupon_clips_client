import logo from './logo.svg';
import React from "react";
import './App.css';
import BarChart from "./components/BarChart"

function App() {
  //State to hold our savings
  const [savings, setSavings] = React.useState([]);
  //State to hold formData
  const [createForm, setCreateForm] = React.useState({
    name: "",
    original_cost: "",
    discount: "",
    month: "",
    savings_cost: "",
  });
  // Function to make api call to get savings
  const getSavings = async () => {
    const response = await fetch("http://localhost:3000/vendors");
    const data = await response.json();
    setSavings(data);
  };
  // this is going to run the getsavings function which pulls from your api when the component loads
  React.useEffect(() => {
    getSavings();
  }, []);

  const loaded = () => (
    <>
      {savings.map((saving) => {
        return (
          <div>
            <h4>{saving.name}</h4>
            <h4>{saving.original_cost}</h4>
            <h4>{saving.discount}</h4>
            <h4>{saving.savings_cost}</h4>
            <h4>{saving.month}</h4>

            <button onClick={async () => {
              await fetch("http://localhost:3000/vendors/" + saving.id, {
                method: "delete"
              })
              getSavings()
            }}>Delete</button>
          </div>
        );
      })}
    </>
  );

  //our handleChange for our create form
  const createChange = (event) => {
    setCreateForm({ ...createForm, [event.target.name]: event.target.value });
  };

  //our handle create function for when the form is submitted
  const handleCreate = async (event) => {
    event.preventDefault(); //prevent page refresh
    await fetch("http://localhost:3000/vendors", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createForm),
    });
    getSavings();
    setCreateForm({
      name: "",
      original_cost: "",
      discount: "",
      month: "",
      savings_cost: "",
    });
  };
  return (
    <div className="App">
      <BarChart />
      <h1>Create Coupon Savings</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          name="vendor"
          placeholder="vendor name"
          value={createForm.name}
          onChange={createChange}
        />
        <input
          type="text"
          name="original_cost"
          placeholder="original cost (XX.XX)"
          value={createForm.original_cost}
          onChange={createChange}
        />
        <input
          type="text"
          name="discount"
          placeholder="discount amount"
          value={createForm.discount}
          onChange={createChange}
        />
        <input
          type="text"
          name="savings_cost"
          placeholder="savings cost (XX.XX)"
          value={createForm.savings_cost}
          onChange={createChange}
        />
        <input
          type="text"
          name="month"
          placeholder="month"
          value={createForm.month}
          onChange={createChange}
        />
        <input type="submit" value="Create Savings" />
      </form>
      <h1>List of Savings</h1>
      {savings.length > 0 ? loaded() : <h2>There are no savings</h2>}
    </div>
  );
}
export default App;

