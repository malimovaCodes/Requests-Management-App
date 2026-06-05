'use client';

import { Select, DatePicker, Space } from 'antd';
import { TRequestStatus, STATUS_LABELS } from '@/types';

const { RangePicker } = DatePicker;

interface RequestFiltersProps {
    filters: {
        department: string | undefined;
        status: TRequestStatus | undefined;
        dateRange: [Date, Date] | null;
    };
    onFilterChange: (filters: RequestFiltersProps['filters']) => void;
    departments: string[];
}

export function RequestFilters({ filters, onFilterChange, departments }: RequestFiltersProps) {
    return (
        <Space wrap className="mb-5 w-full">
            <Select
                placeholder="Все отделы"
                className="w-[200px]"
                allowClear
                value={filters.department}
                onChange={(value) => onFilterChange({ ...filters, department: value })}
                options={departments.map(dept => ({ value: dept, label: dept }))}
            />

            <Select
                placeholder="Все статусы"
                className="w-[200px]"
                allowClear
                value={filters.status}
                onChange={(value) => onFilterChange({ ...filters, status: value })}
                options={Object.entries(STATUS_LABELS).map(([key, label]) => ({
                    value: key,
                    label
                }))}
            />

            <RangePicker
                placeholder={['Дата от', 'Дата до']}
                onChange={(dates) => {
                    if (dates && dates[0] && dates[1]) {
                        onFilterChange({ 
                            ...filters, 
                            dateRange: [dates[0].toDate(), dates[1].toDate()] 
                        });
                    } else {
                        onFilterChange({ ...filters, dateRange: null });
                    }
                }}
            />
        </Space>
    );
}