import { Form, Tabs, Button, Space, Divider, TabsProps, FormInstance, Typography } from 'antd';

interface CreateRequestLayoutProps {
    form: FormInstance;
    tabItems: TabsProps['items'];
    onFinish: (values: import('@/types').TFormValues) => void;
    onCancel: () => void;
}

const { Title } = Typography;

export function CreateRequestLayout({
    form,
    tabItems,
    onFinish,
    onCancel,
}: CreateRequestLayoutProps) {
    return (
        <div className="p-6">
            <Title level={2}>Создание новой заявки</Title>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Tabs 
                    defaultActiveKey="1" 
                    items={tabItems} 
                />
                <Divider />
                <Space>
                    <Button onClick={onCancel}>Отменить</Button>
                    <Button type="primary" htmlType="submit">
                        Готово
                    </Button>
                </Space>
            </Form>
        </div>
    );
}