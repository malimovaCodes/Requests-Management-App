'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Form, message, Badge } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { AppDispatch } from '@/store/store';
import { loadRequestsFromStorage } from '@/store/requestSlice';
import { useRequestCreator } from '@/hooks/useRequestCreator';
import { INITIAL_DEPARTMENTS_MOCK } from '@/constants/mock';
import { MainInfoForm } from '@/components/requests/create/MainInfoForm';
import { ItemsForm } from '@/components/requests/create/ItemsForm';
import { CreateRequestLayout } from '@/components/requests/create/CreateRequestLayout';

export function CreateNewRequestPage() {
    const [form] = Form.useForm();
    const [isNewDepartment, setIsNewDepartment] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '',
        link: '',
        unit: '',
        quantity: 0,
        price: 0,
    });

    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const items = (Form.useWatch('items', form) as import('@/types').TOrderItem[]) || [];
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        dispatch(loadRequestsFromStorage());
    }, [dispatch]);

    const { handleSubmit } = useRequestCreator({
        form,
        isNewDepartment,
        departments: INITIAL_DEPARTMENTS_MOCK,
        grandTotal,
    });

    const handleAddItem = () => {
        if (!newItem.name || newItem.quantity <= 0) {
            message.error('Заполните наименование и количество (> 0)');
            return;
        }

        const currentItems = form.getFieldValue('items') || [];
        let updatedItems: import('@/types').TOrderItem[];

        if (editingIndex !== null) {
            updatedItems = [...currentItems];
            updatedItems[editingIndex] = {
                ...updatedItems[editingIndex],
                name: newItem.name,
                link: newItem.link,
                unit: newItem.unit || 'шт.',
                quantity: newItem.quantity,
                price: newItem.price,
                totalPrice: newItem.quantity * newItem.price,
            };
            message.success('Позиция обновлена');
        } else {
            updatedItems = [
                ...currentItems,
                {
                    id: crypto.randomUUID(),
                    name: newItem.name,
                    link: newItem.link,
                    unit: newItem.unit || 'шт.',
                    quantity: newItem.quantity,
                    price: newItem.price,
                    totalPrice: newItem.quantity * newItem.price,
                },
            ];
            message.success('Позиция добавлена');
        }

        form.setFieldValue('items', updatedItems);

        const newTotal = updatedItems.reduce((sum: number, item: import('@/types').TOrderItem) => {
            return sum + (Number(item.quantity) * Number(item.price) || 0);
        }, 0);
        setGrandTotal(newTotal);

        setNewItem({ name: '', link: '', unit: '', quantity: 0, price: 0 });
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setNewItem({
            name: '',
            link: '',
            unit: '',
            quantity: 0,
            price: 0,
        });
    };

    const handleEditItem = (index: number) => {
        const itemsList = form.getFieldValue('items') || [];
        const itemToEdit = itemsList[index];

        if (itemToEdit) {
            setNewItem({
                name: itemToEdit.name,
                link: itemToEdit.link || '',
                unit: itemToEdit.unit,
                quantity: itemToEdit.quantity,
                price: itemToEdit.price,
            });

            setEditingIndex(index);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Основные данные',
            children: (
                <MainInfoForm
                    form={form}
                    isNewDepartment={isNewDepartment}
                    setIsNewDepartment={setIsNewDepartment}
                    departments={INITIAL_DEPARTMENTS_MOCK}
                />
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    Состав заказа
                    {items.length > 0 && (
                        <Badge
                            count={items.length}
                            style={{ backgroundColor: '#1890ff', marginLeft: 8, fontSize: 12 }}
                        />
                    )}
                </span>
            ),
            children: (
                <ItemsForm
                    form={form}
                    newItem={newItem}
                    setNewItem={setNewItem}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    handleAddItem={handleAddItem}
                    handleEditItem={handleEditItem}
                    handleCancelEdit={handleCancelEdit}
                    grandTotal={grandTotal}
                    items={items}
                />
            ),
        },
    ];

    return (
        <CreateRequestLayout
            form={form}
            tabItems={tabItems}
            onFinish={handleSubmit}
            onCancel={() => router.back()}
        />
    );
}
