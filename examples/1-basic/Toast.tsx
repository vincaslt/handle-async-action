import * as React from 'react'

const style: React.CSSProperties = {
  backgroundColor: '#222',
  borderColor: '#444',
  borderStyle: 'solid',
  borderWidth: 1,
  padding: 16,
  width: 500,
  left: 'calc(50% - 250px)',
  margin: 16
}

interface Props {
  message: string
}

const Toast = ({ message }: Props) => (
  <div style={style}>
    {message}
  </div>
)

export default Toast;