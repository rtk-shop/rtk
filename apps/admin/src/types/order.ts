const enum orderStatus {
  CREATED,
  PROCESSED,
  SENT,
  DONE,
  REJECTED,
  RETURNED
}

export type OrderStatus = keyof typeof orderStatus
