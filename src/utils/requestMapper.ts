import { TRequest, TDepartment, TOrderItem } from '@/types';

interface FormValues {
    creatorName: string;
    departmentId?: string;
    newDepartmentName?: string;
    isApproved?: boolean;
}

interface MapFormToRequestArgs {
    formValues: FormValues;
    items: Array<{
        id?: string;
        name: string;
        link?: string;
        unit: string;
        quantity: number;
        price: number;
    }>;
    isNewDepartment: boolean;
    departments: TDepartment[];
    grandTotal: number;
}

export const mapFormToRequest = ({
    formValues,
    items,
    isNewDepartment,
    departments,
    grandTotal,
}: MapFormToRequestArgs): TRequest => {
    const department: TDepartment = isNewDepartment
        ? { id: crypto.randomUUID(), name: formValues.newDepartmentName || '' }
        : departments.find(d => d.id === formValues.departmentId) || { id: '0', name: 'Неизвестно' };

    const initialStatus = formValues.isApproved ? 'APPROVED' : 'ON_APPROVAL';

    const orderItems: TOrderItem[] = items.map((item) => ({
        id: item.id || crypto.randomUUID(),
        name: item.name,
        link: item.link || '',
        unit: item.unit,
        quantity: Number(item.quantity),
        price: Number(item.price),
        totalPrice: Number(item.quantity) * Number(item.price),
    }));

    return {
        id: crypto.randomUUID(),
        number: Date.now(),
        creatorName: formValues.creatorName,
        department,
        isApproved: formValues.isApproved || false,
        status: initialStatus,
        items: orderItems,
        totalPrice: grandTotal,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
};