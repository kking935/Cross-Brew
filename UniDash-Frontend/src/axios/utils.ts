import { AxiosError } from 'axios';

// istanbul ignore next
export const handleError = (error: AxiosError) => {
    throw error;
};
