// Import komponen-komponen dari Ionic dan lainnya
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonProgressBar, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import logo from '../assets/studysprint.png'; // Logo aplikasi

const Home: React.FC = () => {
  const history = useHistory();

  // State untuk menyimpan input jam, menit, dan detik
  const [jam, setJam] = useState(0);
  const [menit, setMenit] = useState(0);
  const [detik, setDetik] = useState(0);

  // Fungsi ketika tombol "Aku Siap Belajar" ditekan
  const handleStart = () => {
    const totalSeconds = jam * 3600 + menit * 60 + detik;
    if (totalSeconds <= 0) {
      alert('Waktu harus lebih dari 0 detik!');
      return;
    }
    // Navigasi ke halaman /timer sambil mengirim data waktu
    history.push('/timer', { totalSeconds });
  };

  // Generate pilihan angka (0 - max) untuk dropdown jam/menit/detik
  const generateOptions = (max: number) =>
    Array.from({ length: max + 1 }, (_, i) => (
      <IonSelectOption key={i} value={i}>{i}</IonSelectOption>
    ));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle className="title">StudySprint</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        {/* Header sambutan dan logo */}
        <div className="ion-text-center" style={{ marginTop: '2rem' }}>
          <img src={logo} alt="StudySprint Logo" style={{ width: '100px', marginBottom: '1rem' }} />
          <h2>SELAMAT DATANG</h2>
          <p>Sudah Siapkan Target Belajar Hari Ini?</p>
        </div>

        {/* Progress bar (dummy di sini) */}
        <IonProgressBar value={0.5} style={{ marginTop: '1rem' }}></IonProgressBar>

        {/* Input jam */}
        <IonItem>
          <IonLabel>Jam</IonLabel>
          <IonSelect value={jam} onIonChange={(e) => setJam(e.detail.value)}>
            {generateOptions(12)}
          </IonSelect>
        </IonItem>

        {/* Input menit */}
        <IonItem>
          <IonLabel>Menit</IonLabel>
          <IonSelect value={menit} onIonChange={(e) => setMenit(e.detail.value)}>
            {generateOptions(59)}
          </IonSelect>
        </IonItem>

        {/* Input detik */}
        <IonItem>
          <IonLabel>Detik</IonLabel>
          <IonSelect value={detik} onIonChange={(e) => setDetik(e.detail.value)}>
            {generateOptions(59)}
          </IonSelect>
        </IonItem>

        {/* Tombol mulai belajar */}
        <div className="button-container">
          <button className="button-start" onClick={handleStart}>
            Aku Siap Belajar
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
