const ctx = document.getElementById('myChart').getContext('2d');

const labels = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
];
/----------------------------GRADIENT FILLS------------------------/ 
const accuracyGradient=ctx.createLinearGradient(0,0,0,600);
accuracyGradient.addColorStop(0,'lightblue');
accuracyGradient.addColorStop(1,'blueviolet');
const data = {
    labels: labels,
    datasets: [
    {
        borderRadius:'10',
        data:[0.162678957, 0.059880994, 0.040757902, 0.029509127, 0.023729431, 0.017230511, 0.013746418, 0.012072686, 0.009843629, 0.008623526],
        label: "loss",
        fill: false,     
        backgroundColor: 'rgba(142, 61, 209)',
        tension: 0.1,
    },
    {
        data:[0.951200008, 0.981416643, 0.986800015, 0.990483344, 0.992133319, 0.994449973, 0.995166659, 0.995883346, 0.99666667,0.997300029],
        borderRadius:'10',
        label: "accuracy",
        backgroundColor: accuracyGradient,
        fill: false,     
        tension: 0.1,    
    },
    
    ],
};

const config = {
    type: "bar",
    data: data,
    options: {
        responsive: true,
        plugins:{
        legend:{
           labels:{
           color:'white'
           
           },
          },
        },
        scales:{
            x:{
                stacked:true,
                grid:{
                    display:false,
                      },
                ticks:{
                    color:['white'],
                },
                },
            y:{
                ticks:{
                    color:'white',
                    line:false,
                },
                grid:{
                drawBorder:false,
                color:'rgb(0,0,0,0.1)',
                lineWidth:0.8,
          
                },
                beginAtZero:true,
           
            },
        },
        },
    };




const myChart = new Chart(ctx, config);
Chart.defaults.font.size=15;