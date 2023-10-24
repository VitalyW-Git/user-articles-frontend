import React from "react";
import _style from "./MessageList.module.scss"

type Props = {
  messages: string[]
}

const MessageList: React.FC<Props> = (props) => {

  return (
    <>
      {props.messages?.length && props.messages.map((item: string, index: number) => (
        <ul className={_style.message} key={index}>
          <li>{item}</li>
        </ul>
      ))}
    </>
  )
}

export default MessageList