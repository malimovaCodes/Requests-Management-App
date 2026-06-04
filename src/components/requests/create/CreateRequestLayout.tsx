import { Form, Tabs, Button, Space, Divider } from 'antd';
import { TabsProps, FormInstance } from 'antd';

interface CreateRequestLayoutProps {
    form: FormInstance;
    tabItems: TabsProps['items'];
    onFinish: (values: any) => void;
    onCancel: () => void;
}

export function CreateRequestLayout({
    form,
    tabItems,
    onFinish,
    onCancel,
}: CreateRequestLayoutProps) {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Создание новой заявки</h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Tabs defaultActiveKey="1" items={tabItems} />
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