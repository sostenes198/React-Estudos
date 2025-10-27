import gravitationalBeep from '../assets/audios/gravitational_beep.mp3';

export function loadBeep() {
    const audio = new Audio(gravitationalBeep);
    audio.load();

    return async () => {
        audio.currentTime = 0;
        await audio.play();
    };
}