import React from "react";
import Chart from "chart.js";

const BarChart = (props) => {
    const prepareData = (data) => {
        //Empty Chart Data Object
        const chartData = {
          labels: [],
          datasets: [
            {
              label: "Original Costs",
              data: [],
              backgroundColor: "rgba(54,162,235,0.6)",
              borderWidth: 1,
              borderColor: "#777",
            },
            {
              label: "Savings",
              data: [],
              backgroundColor: "rgba(255,99,132,0.6)",
              borderWidth: 1,
              borderColor: "#777",
            },
          ],
        };
        //Loop over API data to populate chart data
        data.forEach((saving) => {
            chartData.labels.push(saving.month);
            chartData.datasets[0].data.push(saving.original_cost);
        });
        data.forEach((saving) => {
            chartData.datasets[1].data.push(saving.savings_cost);
        });
        return chartData;
    };

    const createChart = (data) => {
        //similar $("#savings")
        const ctx = document.querySelector("#savings");
        const savingsChart = new Chart(ctx, {
            type: "bar",
            data: data,
        })
    };

    const getSavings = async () => {
        //run this function when content loads on page
        const response = await fetch("https://couponclips-backend.herokuapp.com/vendors/" + props.vendor_id + "/savings");
        const data = await response.json();
        console.log(data);
        const chartData = await prepareData(data);
        console.log(chartData);
        createChart(chartData);
    };

    //prevent page from reloading each time
    React.useEffect(() => {
        getSavings();
    }, [props.length]);
    return (
        <>
            <h1>Savings</h1>
            <canvas id="savings" width="300" height="100"></canvas>
        </>
    );
};

export default BarChart;
