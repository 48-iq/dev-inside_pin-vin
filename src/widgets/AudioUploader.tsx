import { useState } from 'react';
import { Upload, Button, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadAudio } from '../entities/example';
import type { UploadFile } from 'antd/es/upload/interface';

export const AudioUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const selectedFile = fileList.length > 0 ? (fileList[0].originFileObj as File) : null;
    setFile(selectedFile);
    console.log('Выбран файл:', selectedFile?.name);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error('Пожалуйста, выберите аудиофайл');
      return;
    }

    setUploading(true);
    try {
      await uploadAudio(file);
      message.success('Аудио успешно отправлено!');
      setFile(null);
    } catch (error) {
      message.error('Ошибка при отправке аудио');
      console.error('Ошибка:', error);
    } finally {
      setUploading(false);
    }
  };

  const uploadFileList: UploadFile[] = file
    ? [
        {
          uid: '-1',
          name: file.name,
          status: 'done',
          originFileObj: file as any,
        },
      ]
    : [];

  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Upload
          accept="audio/*"
          beforeUpload={() => false}
          onChange={handleFileChange}
          fileList={uploadFileList}
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button icon={<UploadOutlined />}>Выбрать аудиофайл</Button>
        </Upload>

        <Button
          type="primary"
          onClick={handleUpload}
          disabled={!file || uploading}
          loading={uploading}
          style={{ marginTop: '10px' }}
        >
          Отправить на сервер
        </Button>
      </Space>
    </div>
  );
};
