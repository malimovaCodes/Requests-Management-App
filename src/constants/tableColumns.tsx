import { formatDate } from "@/utils/formatDate";
import { STATUS_LABELS, TRequestStatus } from "@/app/types";
import { StatusBadge } from "../components/common/StatusBadge";


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
        render: (status: TRequestStatus) => <StatusBadge status={status} />
    },
];

export const detailsColumns = [
    { 
        title: '№', 
        key: 'index',
        width: 60,
        render: (_: any, __: any, index: number) => index + 1
    },
    { 
        title: 'Наименование', 
        dataIndex: 'name', 
        key: 'name' 
    },
    { 
        title: 'Ссылка', 
        dataIndex: 'link', 
        key: 'link', 
        render: (link: string) => 
            link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    Открыть
                </a>
            ) : '-' 
    },
    { 
        title: 'Ед. изм.', 
        dataIndex: 'unit', 
        key: 'unit', 
        width: 100 
    },
    { 
        title: 'Кол-во', 
        dataIndex: 'quantity', 
        key: 'quantity', 
        width: 100 
    },
    { 
        title: 'Цена', 
        dataIndex: 'price', 
        key: 'price', 
        width: 120, 
        render: (price: number) => `${price} руб.` 
    },
    { 
        title: 'Сумма', 
        dataIndex: 'totalPrice', 
        key: 'totalPrice', 
        width: 120, 
        render: (total: number) => <b>{total} руб.</b> 
    },
];
