// Function to create a simple line chart for metric cards (sparkline-like)
function createSparklineChart(ctx, data, label, color) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'], // Generic labels
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false },
                y: { display: false }
            },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false } // Sparklines often don't need tooltips
            },
            elements: {
                line: {
                    borderColor: color,
                    borderWidth: 2
                }
            }
        }
    });
}

// Data for sparkline charts (mock data)
const revenueData = [20, 30, 25, 40, 35, 45, 42];
const usersData = [1000, 1200, 1100, 1300, 1250, 1500, 1450];
const salesData = [15, 20, 18, 22, 20, 24, 23];

// Create sparkline charts
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) createSparklineChart(revenueCtx, revenueData, 'Total Revenue', '#7B61FF');

const usersCtx = document.getElementById('usersChart');
if (usersCtx) createSparklineChart(usersCtx, usersData, 'New Users', '#10B981');

const salesCtx = document.getElementById('salesChart');
if (salesCtx) createSparklineChart(salesCtx, salesData, 'Sales', '#EF4444');

// Performance Chart (Bar Chart)
const performanceCtx = document.getElementById('performanceChart');
if (performanceCtx) {
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Income',
                    data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 85, 90, 75],
                    backgroundColor: '#7B61FF',
                    borderRadius: 4,
                },
                {
                    label: 'Expenses',
                    data: [28, 48, 40, 19, 86, 27, 90, 50, 45, 70, 60, 50],
                    backgroundColor: '#A797FF',
                    borderRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4B5563',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 10
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#E5E7EB' },
                    ticks: { font: { size: 12 } }
                }
            }
        }
    });
}

// Customer Satisfaction (Doughnut Chart)
const satisfactionCtx = document.getElementById('satisfactionChart');
if (satisfactionCtx) {
    new Chart(satisfactionCtx, {
        type: 'doughnut',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                data: [60, 30, 10],
                backgroundColor: ['#8B5CF6', '#FBBF24', '#EF4444'], // Colors matching figma-like palette
                hoverOffset: 4,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { display: false }, // Custom legend is used in HTML
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4B5563',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 10,
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Activity Overview (Line Chart)
const activityCtx = document.getElementById('activityChart');
if (activityCtx) {
    new Chart(activityCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#7B61FF',
                    backgroundColor: 'rgba(123, 97, 255, 0.2)', // Light fill for the area
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointBackgroundColor: '#7B61FF',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#7B61FF'
                },
                {
                    label: 'Revenue',
                    data: [28, 48, 40, 19, 86, 27],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointBackgroundColor: '#10B981',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#10B981'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4B5563',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 10
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#E5E7EB' },
                    ticks: { font: { size: 12 } }
                }
            }
        }
    });
}
