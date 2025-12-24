import { ApiBillDetailsModel } from '../api/billing';

export type IBillDetailsModel = {
  hourlyRate: number;
  hours: number;
  total: number;
  platformFee: number;
  platformPercentage: number;
  tax: number;
  grandTotal: number;
};

export const transformBillDetailsModel: (
  data: ApiBillDetailsModel,
) => IBillDetailsModel = (data: ApiBillDetailsModel) => {
  return {
    grandTotal: data.grand_total,
    hourlyRate: data.hourly_rate,
    hours: data.hours,
    platformFee: data.platform_fee,
    platformPercentage: data.platform_percentage,
    tax: data.tax,
    total: data.total,
  };
};
