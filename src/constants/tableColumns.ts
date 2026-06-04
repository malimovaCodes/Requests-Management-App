import { formatDate } from "@/utils/formatDate";
import { STATUS_LABELS, TRequestStatus } from "@/app/types";

export const requestsColumns = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        width: 80,
    },
    {
        title: 'Дата',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => formatDate(date)
    },
    {
        title: 'ФИО',
        dataIndex: 'creatorName',
        key: 'creatorName',
    },
    {
        title: 'Отдел',
        dataIndex: ['department', 'name'],
        key: 'department',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (status: TRequestStatus) => {
            const label = STATUS_LABELS[status];
            return label;
        },
    },
];