'use client'
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { DatePicker, Table, Select, Space } from "antd";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import { RequestStatus, STATUS_LABELS } from "@/app/types";
import { useState, useMemo } from "react";

export default function RequestsListPage() {
    const dispatch = useDispatch<AppDispatch>(); 
    const { requests, isLoading } = useSelector((state: RootState) => state.requests); 

    const { RangePicker } = DatePicker;

    const [filters, setFilters] = useState({
        department: undefined as string | undefined,
        status: undefined as RequestStatus | undefined,
        dateRange: null as [dayjs.Dayjs, dayjs.Dayjs] | null,
    });

    const uniqueDepartments = Array.from(new Set(requests.map(r => r.department.name)));

    const filteredRequests = useMemo(() => {
        return requests.filter((request) => {
            const matchDepartment = !filters.department || request.department.name === filters.department;
            const matchStatus = !filters.status || request.status === filters.status;

            let matchDate = true;
            if (filters.dateRange && filters.dateRange.length === 2) {
                const requestDate = dayjs(request.createdAt);

                const startDate = filters.dateRange[0].startOf('day');
                const endDate = filters.dateRange[1].endOf('day');

                matchDate = requestDate.isBetween(startDate, endDate, 'day', '[]');
            }

            return matchDepartment && matchStatus && matchDate;
        });
    }, [requests, filters]);

    return (
        <div>
            <h1>Список заявок</h1>
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
                    onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                />
            </Space>
            <Table columns={columns} dataSource={filteredRequests} loading={isLoading} rowKey="id" />
        </div>
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
        render: (status: RequestStatus) => {
            const label = STATUS_LABELS[status];
            return label;
        },
    },
];
