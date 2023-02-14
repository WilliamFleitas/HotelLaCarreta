import axios from "axios";


const urlPayment: string = (import.meta.env.VITE_ADAMSPAY_URL as string);
const apiKey: string = (import.meta.env.VITE_ADAMS_APIKEY as string);

interface debtType {
    debt: {
        docId: string,
        amount: {
            currency: string;
            value: number;
        },
        label: string;
        target: {
            type: string;
            number: number | null
            label: string;
        },
        validPeriod: {
            start: string;
            end: string;
        }
        
    }
}
export const setDebt = (body: debtType) => {
    axios.post(`${urlPayment}/api/v1/debts`, body, { headers: {
        'apikey': apiKey,
      }}).then((e ) => {
        window.location.href = e.data.debt.payUrl;}).catch(() => {});
};
