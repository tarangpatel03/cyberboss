export type ApiResponse<T> = {
  result: boolean;
  requestId: string;
  message: string;
  messageLBL: string | null;
  payload: T;
};

export type ListPayload<T> = {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type MetaLink = {
  url: string | null;
  label: string;
  active: boolean;
};
