import './styles.css';


const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
}
class CountdownTimer { 
    constructor({selector, targetDate, onTick, refs }) { 
      this.intervalId = null;
      this.targetDate = targetDate;
      this.onTick = onTick;
      this.refs = refs;
    }
    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now(); 
            const deltaTime = this.targetDate - currentTime;
            const time = this.getTimeComponents(deltaTime);
            console.log(time);
            this.onTick(time);
        }, 1000);
    }
    getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
    pad(value) {
    return String(value).padStart(2, '0');
  }
}


const timer = new CountdownTimer({
  // refs: {
  //   days: document.querySelector('span[data-value="days"]'),
  //   hours: document.querySelector('span[data-value="hours"]'),
  //   mins: document.querySelector('span[data-value="mins"]'),
  //   secs: document.querySelector('span[data-value="secs"]'),
  // },
  selector: '#timer-1', 
  targetDate: new Date('Nov 30, 2020'),
  onTick: updateClockface,
  refs: refs,
});



function updateClockface({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}


timer.start();