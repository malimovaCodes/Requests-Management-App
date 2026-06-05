import { Tag } from 'antd';
import { TRequestStatus, STATUS_LABELS } from '@/types';

interface StatusBadgeProps {
    status: TRequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const colorMap: Record<TRequestStatus, string> = {
        ON_APPROVAL: 'orange',
        APPROVED: 'blue',
        ORDERED: 'purple',
        ARRIVED: 'cyan',
        ISSUED: 'green',
    };

    return <Tag color={colorMap[status]}>{STATUS_LABELS[status]}</Tag>;
}
