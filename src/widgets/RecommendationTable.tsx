import { Button, Collapse, CollapseProps, Modal, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Call } from "../entities/TableSlice";

export const RecommendationTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Call | null>(null);
  const { calls, loading, error } = useSelector((state: RootState) => state.calls);

  if (error) return <div className="centered">Ошибка загрузки данных</div>;

  const showModal = (record: Call) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const getRatingTag = (rating: number) => {
    let color = '';
    let label = '';
    
    if (rating <= 20) {
      color = 'green';
      label = 'Отлично';
    } else if (rating <= 40) {
      color = 'lime';
      label = 'Хорошо';
    } else if (rating <= 60) {
      color = 'orange';
      label = 'Средне';
    } else if (rating <= 80) {
      color = 'volcano';
      label = 'Плохо';
    } else {
      color = 'red';
      label = 'Очень плохо';
    }

    return <Tag color={color}>{label.toUpperCase()} - {rating}/100</Tag>;
  };

  const columns: TableProps<Call>['columns'] = [
    {
      title: 'ДАТА',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
    },
    {
      title: 'НОМЕР ТЕЛЕФОНА',
      dataIndex: 'clientTel',
      key: 'clientTel',
      render: (tel: string) => tel || 'Не указан',
    },
    {
      title: 'ДЛИТЕЛЬНОСТЬ',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} сек.`,
    },
    {
      title: 'ОЦЕНКА',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => getRatingTag(rating),
    },
    {
      title: 'ПОДРОБНЕЕ',
      key: 'action',
      render: (_, record) => (
        <Button 
          onClick={() => showModal(record)} 
          type="primary"
        >
          Подробнее
        </Button>
      ),
    }
  ];

  const getCollapseItems = (record: Call | null): CollapseProps['items'] => {
    if (!record) return [];
    
    return [
      {
        key: '1',
        label: 'Рекомендации',
        children: (
          <ul style={{ margin: 0 }}>
            {record.recommendations?.length ? (
              record.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))
            ) : (
              <li>Нет рекомендаций по этому звонку</li>
            )}
          </ul>
        ),
      },
      {
        key: '2',
        label: 'Баллы чеклиста',
        children: (
          <div>
            <p><strong>Клиентоориентированность:</strong> {record.checklistScores?.clientOrientation ?? 'Н/Д'}</p>
            <p><strong>Контакт:</strong> {record.checklistScores?.contact ?? 'Н/Д'}</p>
            <p><strong>Коммуникация:</strong> {record.checklistScores?.effectiveCommunication ?? 'Н/Д'}</p>
            <p><strong>Презентация:</strong> {record.checklistScores?.presentation ?? 'Н/Д'}</p>
            <p><strong>Аргументация:</strong> {record.checklistScores?.convincingArguments ?? 'Н/Д'}</p>
            <p><strong>Результативность:</strong> {record.checklistScores?.resultOrientation ?? 'Н/Д'}</p>
            <p><strong>Инициативность:</strong> {record.checklistScores?.initiative ?? 'Н/Д'}</p>
            <p><strong>Работа в CRM:</strong> {record.checklistScores?.cpm ?? 'Н/Д'}</p>
          </div>
        ),
      },
      {
        key: '3',
        label: 'Статистика пауз',
        children: (
          <div>
            <p><strong>Средняя длина:</strong> {record.avgPauseLen ?? '—'} сек.</p>
            <p><strong>Максимальная длина:</strong> {record.maxPauseLen ?? '—'} сек.</p>
          </div>
        ),
      }
    ];
  };

  return (
    <div style={{ padding: '20px 200px' }}>
      <Table
        columns={columns}
        dataSource={calls}
        loading={loading}
        rowKey="id"
      />
      
      <Modal
        title={`Детали звонка: ${selectedRecord?.clientTel || 'неизвестный номер'}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>
        ]}
      >
        {selectedRecord ? (
          <Collapse
            items={getCollapseItems(selectedRecord)}
            style={{ marginTop: 16 }}
          />
        ) : (
          <div style={{ padding: '20px 0', textAlign: 'center' }}>
            Не удалось загрузить данные о звонке
          </div>
        )}
      </Modal>
    </div>
  );
};
