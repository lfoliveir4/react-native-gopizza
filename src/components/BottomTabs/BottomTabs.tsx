import React, { ReactElement } from "react";

import {
  Container,
  Notification,
  Title,
  Quantity
} from './styles'

type Props = {
  title: string
  color: string
  notifications?: string | undefined
}

export default function BottomTabs({ notifications, color, title }: Props): ReactElement {
  const noNotifications = notifications === '0'

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {notifications && (
        <Notification noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
        </Notification>
      )}
    </Container>
  )
}
