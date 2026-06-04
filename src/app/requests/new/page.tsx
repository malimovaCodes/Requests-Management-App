'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Form, Button, Tabs, Space, message, Divider, Badge } from 'antd';
import { loadRequestsFromStorage } from '@/store/requestSlice';
import { useRequestCreator } from '@/hooks/useRequestCreator';
import { AppDispatch } from '@/store/store';
import { MainInfoForm } from '@/components/requests/create/MainInfoForm';
import { ItemsForm } from '@/components/requests/create/ItemsForm';
import { TabsProps } from 'antd/lib/tabs';

import { INITIAL_DEPARTMENTS_MOCK } from '@/constants/mock';

export default function CreateNewRequestPage() {
    const [form] = Form.useForm();
    const [isNewDepartment, setIsNewDepartment] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '',
        link: '',
        unit: '',
        quantity: 0,
        price: 0
    });

    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const items = Form.useWatch('items', form) || [];
    const grandTotal = items.reduce((sum: number, item: any) => {
        return sum + (Number(item.quantity) * Number(item.price) || 0);
    }, 0);

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

        if (editingIndex !== null) {
            const updatedItems = [...currentItems];
            updatedItems[editingIndex] = {
                ...updatedItems[editingIndex],
                name: newItem.name,
                link: newItem.link,
                unit: newItem.unit || 'шт.',
                quantity: newItem.quantity,
                price: newItem.price,
                totalPrice: newItem.quantity * newItem.price
            };

            form.setFieldValue('items', updatedItems);
            message.success('Позиция обновлена');
        } else {
            form.setFieldValue('items', [
                ...currentItems,
                {
                    id: crypto.randomUUID(),
                    name: newItem.name,
                    link: newItem.link,
                    unit: newItem.unit || 'шт.',
                    quantity: newItem.quantity,
                    price: newItem.price,
                    totalPrice: newItem.quantity * newItem.price
                }
            ]);
            message.success('Позиция добавлена');
        }

        setNewItem({
            name: '',
            link: '',
            unit: '',
            quantity: 0,
            price: 0
        });
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setNewItem({
            name: '',
            link: '',
            unit: '',
            quantity: 0,
            price: 0
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
                price: itemToEdit.price
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
                        <Badge count={items.length} style={{ backgroundColor: '#1890ff', marginLeft: 8, fontSize: 12 }} />
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
        <div style={{ padding: '20px' }}>
            <h1>Создание новой заявки</h1>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Tabs defaultActiveKey="1" items={tabItems} />
                <Divider />
                <Space>
                    <Button onClick={() => router.back()}>Отменить</Button>
                    <Button type="primary" htmlType="submit">Готово</Button>
                </Space>
            </Form>
        </div>
    );
}