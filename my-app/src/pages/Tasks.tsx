import {
  IonButton, IonContent, IonIcon, IonInput, IonItem,
  IonLabel, IonList, IonPage, IonCheckbox, IonHeader, IonToolbar, IonTitle
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useState } from 'react';
import './Tasks.css';

const Tasks: React.FC = () => {
  const [task, setTask] = useState(''); // input user
  const [taskList, setTaskList] = useState<{ text: string; done: boolean }[]>([]); // list semua task

  // Tambahkan task ke list
  const addTask = () => {
    if (task.trim()) {
      setTaskList([...taskList, { text: task, done: false }]);
      setTask('');
    }
  };

  // Tandai task sebagai selesai atau belum
  const toggleTask = (index: number) => {
    const newList = [...taskList];
    newList[index].done = !newList[index].done;
    setTaskList(newList);
  };

  // Hapus task dari list
  const deleteTask = (index: number) => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding task-page">
        {/* Input tugas */}
        <div className="task-header">
          <h2 className="task-title">📋 Masukkan Task-Task Kamu</h2>
          <IonItem className="task-input">
            <IonInput
              value={task}
              onIonChange={(e) => setTask(e.detail.value!)}
              placeholder="Isi di sini"
            />
          </IonItem>
        </div>

        {/* Tombol tambah task */}
        <IonButton expand="block" onClick={addTask} className="add-task-button">
          Tambah Task
        </IonButton>
        
        {/* Daftar tugas */}
        <IonList>
          {taskList.map((t, i) => (
            <IonItem key={i} className={`task-item ${t.done ? 'done' : ''}`}>
              <IonCheckbox
                slot="start"
                checked={t.done}
                onIonChange={() => toggleTask(i)}
                className="checkbox"
              />
              <IonLabel className={`task-label ${t.done ? 'line-through' : ''}`}>
                {t.text}
              </IonLabel>
              <IonIcon
                icon={trash}
                slot="end"
                onClick={() => deleteTask(i)}
                className="delete-icon"
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
