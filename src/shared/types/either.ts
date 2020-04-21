export type Either<F, R> = Fail<F, R> | Success<F, R>;
export class Fail<F, R> {
  public readonly value: F;
  constructor(fail: F) {
    this.value = fail;
  }

  isFail(): this is Fail<F, R> {
    return true;
  }

  isSuccess(): this is Success<F, R> {
    return false;
  }
}
export class Success<F, R> {
  public readonly value: R;
  constructor(result: R) {
    this.value = result;
  }

  public isFail(): this is Fail<F, R> {
    return false;
  }

  public isSuccess(): this is Success<F, R> {
    return true;
  }
}
export const success = <F, R>(result: R): Either<F, R> => {
  return new Success<F, R>(result);
};
export const fail = <F, R>(fail: F): Either<F, R> => {
  return new Fail<F, R>(fail);
};
