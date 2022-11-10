import { Container } from './styles'

interface LoadingProps {
  className?: string
  color?: string
}

export function Loading({ className, color = 'hsl(var(--p))' }: LoadingProps) {
  return (
    <Container color={color}>
      <div className={`lds-spinner ${className}`}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </Container>
  )
}
