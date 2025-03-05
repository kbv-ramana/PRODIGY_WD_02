class Stopwatch {
    constructor(display, lapTimesDisplay) {
        this.display = display;
        this.lapTimesDisplay = lapTimesDisplay;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.isRunning = false;
        this.laps = [];
    }

    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => this.update(), 10);
            this.isRunning = true;
            document.body.classList.remove('paused');
            document.body.classList.add('running');
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            resetBtn.disabled = false;
            lapBtn.disabled = false;
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.elapsedTime = Date.now() - this.startTime;
            this.isRunning = false;
            document.body.classList.remove('running');
            document.body.classList.add('paused');
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }

    reset() {
        clearInterval(this.intervalId);
        this.display.textContent = '00:00:00.00';
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.laps = [];
        document.body.classList.remove('running', 'paused');
        this.lapTimesDisplay.innerHTML = '';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        lapBtn.disabled = true;
    }

    recordLap() {
        if (this.isRunning) {
            const lapTime = this.formatTime(this.elapsedTime);
            this.laps.push(lapTime);
            const lapElement = document.createElement('div');
            lapElement.textContent = `Lap ${this.laps.length}: ${lapTime}`;
            this.lapTimesDisplay.appendChild(lapElement);
            this.lapTimesDisplay.scrollTop = this.lapTimesDisplay.scrollHeight;
        }
    }

    update() {
        this.elapsedTime = Date.now() - this.startTime;
        this.display.textContent = this.formatTime(this.elapsedTime);
    }

    formatTime(milliseconds) {
        const pad = (num) => num.toString().padStart(2, '0');
        const ms = Math.floor((milliseconds % 1000) / 10);
        const secs = Math.floor((milliseconds / 1000) % 60);
        const mins = Math.floor((milliseconds / (1000 * 60)) % 60);
        const hrs = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms)}`;
    }
}

// DOM Element References
const display = document.getElementById('display');
const lapTimesDisplay = document.getElementById('lapTimes');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

// Create Stopwatch Instance
const stopwatch = new Stopwatch(display, lapTimesDisplay);

// Event Listeners
startBtn.addEventListener('click', () => stopwatch.start());
pauseBtn.addEventListener('click', () => stopwatch.pause());
resetBtn.addEventListener('click', () => stopwatch.reset());
lapBtn.addEventListener('click', () => stopwatch.recordLap());