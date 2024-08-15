import { Observable } from '@apollo/client'

export const promiseToObservable = (promise: Promise<any>): Observable<unknown> =>
  // eslint-disable-next-line
  new Observable((subscriber: any) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return
        subscriber.next(value)
        subscriber.complete()
      },
      (err) => subscriber.error(err)
    )
  })
