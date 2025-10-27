import type {TaskStateModel} from '../models/TaskStateModel';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private readonly worker: Worker;

    private constructor() {
        this.worker = new Worker(new URL('./timerWorker.ts', import.meta.url), { type: 'module' });
    }

    public static getInstance() {
        if (!instance) instance = new TimerWorkerManager();

        return instance;
    }

    public postMessage(message: TaskStateModel) {
        this.worker.postMessage(message);
    }

    public onMessage(cb: (e: MessageEvent) => void) {
        this.worker.onmessage = cb;
    }

    public terminate() {
        this.worker.terminate();
        instance = null;
    }
}