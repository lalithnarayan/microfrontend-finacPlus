declare module 'react-midi-player' {
    interface MidiPlayerProps {
        src: string;
        autoplay?: boolean;
        onEnd?: () => void;
        onError?: () => void;
        className?: string;
    }
    
    const MidiPlayer: React.FC<MidiPlayerProps>;
    export default MidiPlayer;
} 