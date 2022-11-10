export type StateProps<S, K> = Awaited<ReturnType<S[K]>>

export type Props<T, S> = Parameters<T[S]>[0]
