import './style.css'

document.querySelector('#app').innerHTML = `
  <div id="desktop">
    <div id="taskbar">
      <div id="clock-widget">
        <div class="clock">--:--</div>
        <div class="date">--- --</div>
      </div>
    </div>
    <div id="topbar">
      
    </div>
  </div>
`

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const day = String(now.getDate()).padStart(2, '0');

  document.querySelector('.clock').textContent = `${hours}:${minutes}`;
  document.querySelector('.date').textContent = `${month} ${day}`;
}


updateClock();
setInterval(updateClock, 1000);