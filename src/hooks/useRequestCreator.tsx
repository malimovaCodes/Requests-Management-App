'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { FormInstance, message } from 'antd';
import { AppDispatch } from '@/store/store';
import { addRequest } from '@/store/requestSlice';
import { TDepartment, TFormValues } from '@/types';
import { mapFormToRequest } from '@/utils/requestMapper';

interface UseRequestCreatorArgs {
    form: FormInstance;
    isNewDepartment: boolean;
    departments: TDepartment[];
    grandTotal: number;
}

export function useRequestCreator({
    form,
    isNewDepartment,
    departments,
    grandTotal,
}: UseRequestCreatorArgs) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = useCallback(
        async (values: TFormValues) => {
            const itemsFromForm: Array<{
                id?: string;
                name: string;
                link?: string;
                unit: string;
                quantity: number;
                price: number;
            }> = form.getFieldValue('items') || [];

            console.log('Items из формы:', itemsFromForm);

            if (itemsFromForm.length === 0) {
                message.error('Нельзя создать заявку без позиций.');
                return;
            }

            try {
                await form.validateFields();
            } catch (error) {
                console.error('Validation error:', error);
                message.error('Пожалуйста, заполните все обязательные поля');
                return;
            }

            const newRequest = mapFormToRequest({
                formValues: values,
                items: itemsFromForm,
                isNewDepartment,
                departments,
                grandTotal,
            });

            dispatch(addRequest(newRequest));
            message.success('Заявка создана!');
            router.push('/requests');
        },
        [form, isNewDepartment, departments, grandTotal, dispatch, router]
    );

    return { handleSubmit };
}
