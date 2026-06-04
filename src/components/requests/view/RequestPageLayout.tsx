import { Tabs, Button, Typography } from 'antd';
import { TabsProps } from 'antd';
import { TRequest, STATUS_LABELS } from '@/types';

interface RequestViewLayoutProps {
    request: TRequest;
    tabItems: TabsProps['items'];
    onBack: () => void;
}

const { Title } = Typography;

export function RequestViewLayout({ request, tabItems, onBack }: RequestViewLayoutProps) {
    return (
        <div style={{ padding: '24px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <div>
                    <Title level={2}>Заявка №{request.number}</Title>
                    
                    <div
                        style={{
                            marginTop: 8,
                            display: 'inline-block',
                            padding: '4px 12px',
                            backgroundColor: '#e6f7ff',
                            borderRadius: 4,
                            color: '#1890ff',
                            fontSize: 14,
                        }}
                    >
                        {STATUS_LABELS[request.status]}
                    </div>
                </div>
                
                <Button
                    size="large"
                    onClick={onBack}
                    style={{ borderColor: '#d9d9d9', color: '#666' }}
                >
                    - К списку заявок
                </Button>
            </div>

            <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
    );
}