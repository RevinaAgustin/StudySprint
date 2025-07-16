// Import Ionic dan React hooks
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import './Timer.css';

interface LocationState {
  totalSeconds?: number;
}

const Timer: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const incomingSeconds = location.state?.totalSeconds;

  // Ambil waktu dari localStorage jika tersedia
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    const saved = localStorage.getItem('study-timer');
    return incomingSeconds ?? (saved ? parseInt(saved) : 0);
  });

  // Status jeda
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    const saved = localStorage.getItem('study-paused');
    return saved === 'true';
  });

  // Penanda apakah timer sudah dimulai
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Jika ada waktu baru dikirim dari halaman Home
  useEffect(() => {
    if (incomingSeconds !== undefined) {
      localStorage.setItem('study-timer', incomingSeconds.toString());
      localStorage.setItem('study-paused', 'false');
      setSecondsLeft(incomingSeconds);
      setIsPaused(false);
      setHasStarted(true);
    }
  }, [incomingSeconds]);

  // Hitung mundur tiap detik
  useEffect(() => {
    if (secondsLeft <= 0 || isPaused) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        localStorage.setItem('study-timer', next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isPaused]);

  // Format waktu jadi HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Pause atau lanjutkan timer
  const togglePause = () => {
    setIsPaused((prev) => {
      localStorage.setItem('study-paused', (!prev).toString());
      return !prev;
    });
  };

  // Reset dan kembali ke home
  const resetTimer = () => {
    localStorage.removeItem('study-timer');
    localStorage.removeItem('study-paused');
    setSecondsLeft(0);
    setIsPaused(false);
    setHasStarted(false);
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Timer Belajar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center page-timer">
        {/* Tampilkan waktu */}
        <h1 className="timer-display">{formatTime(secondsLeft)}</h1>

        {/* Pesan jika waktu habis */}
        {hasStarted && secondsLeft <= 0 && (
          <p className="timer-message">🎉 Waktu habis! Kamu hebat!</p>
        )}

        {/* Kontrol pause dan reset */}
        <div className="timer-controls">
          <IonButton onClick={togglePause} className="pause">
            {isPaused ? 'Lanjutkan' : 'Jeda'}
          </IonButton>

          <IonButton onClick={resetTimer} className="reset">
            Ulangi
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Timer;
