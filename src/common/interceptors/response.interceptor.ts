import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Response<T> {
  data: T
}
interface ResponseData {
  data: Object | String,
  msg: String
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>)
    : Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        if (typeof data == 'string') {
          return {
            data,
            code: 200,
            message: data
          }
        } else {
          return {
            data,
            code: 200,
            message: "请求成功"
          }
        }
      })
    )
  }
}