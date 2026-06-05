import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function useRequestById() {
    const searchParams = useSearchParams();
    
    const id = searchParams?.get('id') ?? null;

    const { requests } = useSelector((state: RootState) => state.requests);
    const request = requests.find((r) => r.id === id);

    return { id, request };
}