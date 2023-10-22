import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Collapse} from "antd";
import _styles from "./Add.module.scss";


const Add: React.FC = () => {
  return (
    <Collapse
      className={_styles.section}
      items={[{
        key: 1, label:
          <div className={_styles.section__add}>
            <PlusOutlined
              style={{fontSize: '32px', color: '#1677ff', fontWeight: 600}}
              twoToneColor="#eb2f96"
            />
            Добавить запись
          </div>,
        children:
          <>
            8788878
          </>,
        showArrow: false,
      }]}
    />
  )
}

export default Add