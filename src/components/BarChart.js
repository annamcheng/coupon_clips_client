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
                },
                {
                    label: "Savings",
                    data: [],
                },
            ],
        };
        //Loop over API data to populate chart data
        data[0].savings.forEach((saving) => {
            chartData.labels.push(saving.month);
            chartData.datasets[0].data.push(saving.original_cost);
        });
        data[0].savings.forEach((saving) => {
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
        });
    };

    const getSavings = async () => {
        //run this function when content loads on page
        const response = await fetch("http://localhost:3000/vendors");
        const data = await response.json();
        console.log(data);
        const chartData = await prepareData(data);
        console.log(chartData);
        createChart(chartData);
    };

    //prevent page from reloading each time
    React.useEffect(() => {
        getSavings();
    }, []);
    return (
        <>
            <h1>Savings</h1>
            <canvas id="savings" width="300" height="100"></canvas>
        </>
    );
};

export default BarChart;
