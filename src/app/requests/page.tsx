'use client'
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { loadRequestsFromStorage } from "@/store/requestSlice"
import { DatePicker, Table, Select, Space, Button } from "antd";
import { TRequestStatus, STATUS_LABELS } from "@/app/types";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { formatDate, isDateInRange } from "@/utils/formatDate";
import Title from "antd/es/skeleton/Title";
import { Typography } from 'antd';


export default function RequestsListPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { requests, isLoading } = useSelector((state: RootState) => state.requests);

    const { RangePicker } = DatePicker;
    const { Title } = Typography;


    const [filters, setFilters] = useState({
        department: undefined as string | undefined,
        status: undefined as TRequestStatus | undefined,
        dateRange: null as [Date, Date] | null,
    });

    const uniqueDepartments = Array.from(new Set(requests.map(r => r.department.name)));

    const filteredRequests = useMemo(() => {
        return requests.filter((request) => {
            const matchDepartment = !filters.department || request.department.name === filters.department;
            const matchStatus = !filters.status || request.status === filters.status;

            let matchDate = true;
            if (filters.dateRange && filters.dateRange.length === 2) {
                matchDate = isDateInRange(
                    request.createdAt,
                    filters.dateRange[0],
                    filters.dateRange[1]
                );
            }

            return matchDepartment && matchStatus && matchDate;
        });
    }, [requests, filters]);

    useEffect(() => {
        dispatch(loadRequestsFromStorage());
    }, [dispatch]);

    return (
        <>
            <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
                <Title>Список заявок</Title>
            <Space wrap style={{ marginBottom: 20, width: '100%' }}>
                <Select
                    placeholder="Все отделы"
                    style={{ width: 200 }}
                    allowClear
                    value={filters.department}
                    onChange={(value) => setFilters({ ...filters, department: value })}
                    options={uniqueDepartments.map(dept => ({ value: dept, label: dept }))}
                />

                <Select
                    placeholder="Все статусы"
                    style={{ width: 200 }}
                    allowClear
                    value={filters.status}
                    onChange={(value) => setFilters({ ...filters, status: value })}
                    options={Object.entries(STATUS_LABELS).map(([key, label]) => ({
                        value: key,
                        label
                    }))}
                />

                <RangePicker
                    placeholder={['Дата от', 'Дата до']}
                    onChange={(dates) => {
                        if (dates && dates[0] && dates[1]) {
                            setFilters({ 
                                ...filters, 
                                dateRange: [dates[0].toDate(), dates[1].toDate()] 
                            });
                        } else {
                            setFilters({ ...filters, dateRange: null });
                        }
                    }}
                />
                <Button
                    type="primary"
                    size="large"
                    onClick={() => router.push('/requests/new')}
                >
                    Создать заявку
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredRequests}
                loading={isLoading} rowKey="id"
                onRow={(record) => ({
                    onClick: () => {
                        router.push(`/requests/view?id=${record.id}`);
                    },
                    style: { cursor: 'pointer' }
                })}
            />
            </div>

            
        </>
    );
}

const columns = [
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
