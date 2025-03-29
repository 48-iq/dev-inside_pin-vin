import { Button, Collapse, CollapseProps, Modal, Table, TableProps } from "antd"
import Panel from "antd/es/splitter/Panel";
import { useState } from "react";

export const RecommendationTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, data) => (
        <Button onClick={showModal} type="primary">Получить</Button>
      )
    }
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
  ];

  const text = `
    че то че то
  `;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Рекомендации',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'Баллы чеклиста',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'Количество пауз',
      children: <p>{text}</p>,
    },
    {
      key: '4',
      label: 'Средняя длинна пауз',
      children: <p>{text}</p>,
    },
    {
      key: '5',
      label: 'Максимальная длинна паузы',
      children: <p>{text}</p>,
    },
  ];

  return (
    <div style={{padding: '20px 200px'}}> 
      <Table 
        columns={columns} 
        dataSource={data} 
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
      />
      <Modal title="Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Collapse items={items} />
      </Modal>
    </div>
  )
}