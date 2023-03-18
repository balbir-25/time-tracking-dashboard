const dailyLink = document.querySelector('#daily');
const weeklyLink = document.querySelector('#weekly');
const monthlyLink = document.querySelector('#monthly');

const current = document.querySelectorAll('.head-h2');
const previous = document.querySelectorAll('.head-h3');

let timeframe = 'weekly'; // default timeframe

// Function to get data from data.json
const getData = async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Function to update the UI with the fetched data
const updateUI = (data) => {
  data.forEach((activity, index) => {
    const time = activity.timeframes[timeframe];
    current[index].textContent = `${time.current}hrs`;
    let timeframeLabel;
    switch (timeframe) {
      case 'daily':
        timeframeLabel = 'Yesterday';
        break;
      case 'weekly':
        timeframeLabel = 'Last week';
        break;
      case 'monthly':
        timeframeLabel = 'Last month';
        break;
      default:
        timeframeLabel = '';
    }
    previous[index].textContent = `${timeframeLabel} - ${time.previous}hrs`;
  });
};


// Event listeners for the timeframe links
dailyLink.addEventListener('click', () => {
  timeframe = 'daily';
  getData().then((data) => updateUI(data));
});

weeklyLink.addEventListener('click', () => {
  timeframe = 'weekly';
  getData().then((data) => updateUI(data));
});

monthlyLink.addEventListener('click', () => {
  timeframe = 'monthly';
  getData().then((data) => updateUI(data));
});

// Call the getData function on page load to display the default weekly data
getData().then((data) => updateUI(data));
