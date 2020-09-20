const toMilliseconds = unit => {
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  if (unit === 'seconds') return seconds;
  if (unit === 'minutes') return minutes;
  if (unit === 'hours') return hours;
  if (unit === 'days') return days;
};


const getCountdown = (endDate, startDate) => {
  const difference = endDate - startDate;
  const days = Math.floor(difference / toMilliseconds('days'));
  const hours = Math.floor(
    (difference % toMilliseconds('days')) / toMilliseconds('hours')
  );
  const minutes = Math.floor(
    (difference % toMilliseconds('hours')) / toMilliseconds('minutes')
  );
  const seconds = Math.floor(
    (difference % toMilliseconds('minutes')) / toMilliseconds('seconds')
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const setCountdownTarget = date => {
  const target = document.querySelector('.countdown__target');
  target.textContent = `
        ${date.toLocaleString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      `;

  target.dataset.datetime =
    date.toLocaleString('en-GB', { year: 'numeric' }) +
    '-' +
    date.toLocaleString('en-GB', { month: '2-digit' }) +
    '-' +
    date.toLocaleString('en-GB', { day: '2-digit' });
};

// setInterval(_ => {
//   const now = new Date();
//   const values = getCountdown(nextMonth, now);
//   const boxes = document.querySelectorAll('.timer__box');

//   boxes.forEach(box => {
//     const unit = box.dataset.unit;
//     const value = values[unit];
//     box.firstElementChild.textContent = value;
//   });
// }, 1000);

const updateBoxes = endDate => {
  const now = new Date();
  const values = getCountdown(endDate, now);
  const boxes = document.querySelectorAll('.timer__box');

  boxes.forEach(box => {
    const unit = box.dataset.unit;
    const value = values[unit];
    box.firstElementChild.textContent = value;
  });
};

const now = new Date();
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

// const values = getCountdown(nextMonth, now);
// const boxes = document.querySelectorAll('.timer__box');

// boxes.forEach(box => {
//   const unit = box.dataset.unit;
//   const value = values[unit];
//   box.firstElementChild.textContent = value;
// });

updateBoxes(nextMonth);
setInterval(updateBoxes, 1000, nextMonth);

setCountdownTarget(nextMonth);
