import logo from "./logo.svg";
import React from "react";
import "./App.css";
import BarChart from "./components/BarChart";

function App(props) {
  //State to hold our savings
  const [savings, setSavings] = React.useState([]);
  //State to hold formData
  const [createForm, setCreateForm] = React.useState({
    original_cost: "",
    discount: "",
    savings_cost: "",
    month: "",
    vendor_id: 1,
  });
  // Function to make api call to get savings
  const getSavings = async () => {
    const response = await fetch(
      "https://couponclips-backend.herokuapp.com/vendors/" +
        createForm.vendor_id +
        "/savings"
    );
    console.log(response);
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
          <div key={saving.id}>
            <h4>Original Cost: ${saving.original_cost}</h4>
            <h4>Discount Amount: {saving.discount}</h4>
            <h4>Savings Cost: ${saving.savings_cost}</h4>
            <h4>Month: {saving.month}</h4>
            <h4>Vendor ID (1-5): {saving.vendor_id}</h4>

            <button
              onClick={async () => {
                await fetch(
                  "https://couponclips-backend.herokuapp.com/vendors/" +
                  createForm.vendor_id +
                  "/savings/" +
                  saving.id,
                  {
                    method: "put",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(FormData),
                  }
                );
                getSavings();
              }}
            >
              Edit
            </button>
            <button
              onClick={async () => {
                await fetch(
                  "https://couponclips-backend.herokuapp.com/vendors/" +
                    createForm.vendor_id +
                    "/savings/" +
                    saving.id,
                  {
                    method: "delete",
                  }
                );
                getSavings();
              }}
            >
              Delete
            </button>
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

    await fetch(
      "https://couponclips-backend.herokuapp.com/vendors/" +
        createForm.vendor_id +
        "/savings",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createForm),
      }
    );
    getSavings();
    setCreateForm({
      original_cost: "",
      discount: "",
      savings_cost: "",
      month: "",
      vendor_id: 1,
    });
  };
  return (
    <div className="App">
      <BarChart />
      <h1>Create Coupon Savings</h1>
      <form onSubmit={handleCreate}>
        Original Cost: $
        <input
          type="text"
          name="original_cost"
          placeholder="XX.XX"
          value={createForm.original_cost}
          onChange={createChange}
        />
        <br />
        Discount Amount: $
        <input
          type="text"
          name="discount"
          placeholder="XX.XX"
          value={createForm.discount}
          onChange={createChange}
        />
        <br />
        Savings Cost: $
        <input
          type="text"
          name="savings_cost"
          placeholder="XX.XX"
          value={createForm.savings_cost}
          onChange={createChange}
        />
        <br />
        Month:{" "}
        <input
          type="text"
          name="month"
          placeholder="month"
          value={createForm.month}
          onChange={createChange}
        />
        <br />
        Vendor ID:{" "}
        <input
          type="text"
          name="vendor_id"
          placeholder="Vendor ID #"
          value={createForm.vendor_id}
          onChange={createChange}
        />
        <br />
        <i>See Vendor List</i>
        <br />
        (1= Home Depot) <br />
        (2= Bed Bath and Beyond) <br />
        (3= Guitar Center) <br />
        (4= Tory Burch) <br />
        (5= Walgreens) <br />
        <br />
        <input type="submit" value="Create Savings" />
      </form>
      <h1>List of Savings</h1>
      {savings.length > 0 ? loaded() : <h2>There are no savings</h2>}
    </div>
  );
}
export default App;
