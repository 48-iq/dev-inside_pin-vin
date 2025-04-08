import { useState } from 'react';
import { Button, message } from 'antd';
import { uploadAudio } from '../entities/example';

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], 'recorded-audio.webm', { type: 'audio/webm' });

        try {
          await uploadAudio(audioFile);
          message.success('Аудио успешно отправлено!');
        } catch (error) {
          message.error('Ошибка при отправке аудио');
        }

        stream.getTracks().forEach(track => track.stop());
        setMediaRecorder(null);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      message.info('Запись началась');
    } catch (error) {
      message.error('Не удалось получить доступ к микрофону');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      message.info('Запись остановлена');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button
        type="primary"
        danger={isRecording}
        onClick={isRecording ? stopRecording : startRecording}
        icon={isRecording ? <span>⏹</span> : <span>🎙</span>}
      >
        {isRecording ? 'Остановить запись' : 'Начать запись'}
      </Button>
    </div>
  );
}
