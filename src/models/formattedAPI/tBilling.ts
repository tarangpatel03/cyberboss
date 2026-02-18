import { ApiBillDetailsModel } from '@models/api/billing';

export type TBillDetailsModel = {
  hourlyRate?: number;
  hours?: number;
  total?: number;
  platformFee?: number;
  platformPercentage?: number;
  tax?: number;
  grandTotal?: number;
};

export const transformBillDetailsModel: (
  data: ApiBillDetailsModel,
) => TBillDetailsModel = (data: ApiBillDetailsModel) => {
  return {
    hourlyRate: data.hourly_rate,
    hours: data.hours,
    platformFee: data.platform_fee,
    platformPercentage: data.platform_percentage,
    tax: data.tax,
    total: data.total,
    grandTotal: data.grand_total,
  };
};
