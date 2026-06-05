'use client';

import { Tabs, Button, Typography } from 'antd';
import { TabsProps } from 'antd';
import { TRequest, STATUS_LABELS } from '@/types';
import styles from './RequestViewLayout.module.scss';

interface RequestViewLayoutProps {
    request: TRequest;
    tabItems: TabsProps['items'];
    onBack: () => void;
}

const { Title } = Typography;

export function RequestViewLayout({ request, tabItems, onBack }: RequestViewLayoutProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>
                        Заявка №{request.number}
                    </Title>

                    <div className={styles.statusBadge}>{STATUS_LABELS[request.status]}</div>
                </div>

                <Button size="large" onClick={onBack} className={styles.backButton}>
                    К списку заявок
                </Button>
            </div>

            <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
    );
}
