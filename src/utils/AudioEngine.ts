export default class AudioEngine {
    private static instance: AudioEngine;
    private context: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private oscillators: OscillatorNode[] = [];
    private noiseNode: AudioBufferSourceNode | null = null;
    private noiseBuffer: AudioBuffer | null = null;
    private isMuted: boolean = true;

    private constructor() { }

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    public init() {
        if (this.context) return;

        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.context.createGain();
        this.masterGain.connect(this.context.destination);
        this.masterGain.gain.value = 0; // Start muted
    }

    public toggleSound(): boolean {
        if (!this.context) this.init();

        if (this.context?.state === 'suspended') {
            this.context.resume();
        }

        this.isMuted = !this.isMuted;

        if (!this.isMuted) {
            this.startDrone();
            this.fadeTo(0.3);
        } else {
            this.fadeTo(0);
            setTimeout(() => this.stopDrone(), 1000);
        }

        return !this.isMuted;
    }

    private startDrone() {
        if (this.oscillators.length > 0) return;
        if (!this.context || !this.masterGain) return;

        // Create a deep cosmic drone
        const freqs = [55, 110, 165, 220]; // A1, A2, E3, A3

        freqs.forEach(freq => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            // Add some detuning for richness
            osc.detune.value = (Math.random() - 0.5) * 10;

            gain.gain.value = 0.1;

            osc.connect(gain);
            gain.connect(this.masterGain!);
            osc.start();
            this.oscillators.push(osc);
        });

        // Add a noise layer for "space wind"
        if (!this.noiseBuffer) {
            const bufferSize = this.context.sampleRate * 2;
            this.noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
            const data = this.noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
        }

        const noise = this.context.createBufferSource();
        noise.buffer = this.noiseBuffer;
        noise.loop = true;

        const noiseFilter = this.context.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 400;

        const noiseGain = this.context.createGain();
        noiseGain.gain.value = 0.05;

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain!);
        noise.start();
        this.noiseNode = noise;
    }

    private stopDrone() {
        this.oscillators.forEach(osc => {
            try {
                osc.stop();
                osc.disconnect();
            } catch (e) { }
        });
        this.oscillators = [];

        if (this.noiseNode) {
            try {
                this.noiseNode.stop();
                this.noiseNode.disconnect();
            } catch (e) { }
            this.noiseNode = null;
        }
    }

    private fadeTo(value: number) {
        if (!this.masterGain || !this.context) return;

        const now = this.context.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.linearRampToValueAtTime(value, now + 1);
    }

    // SETI Audio Features

}
