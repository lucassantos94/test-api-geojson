export interface IUseCase<T, U> {
  execute(props: T): U;
}
