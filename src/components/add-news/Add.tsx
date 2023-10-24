import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Collapse, Modal} from "antd";
import _style from "./Add.module.scss";
import FormNews from "./form/FormNews";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {formSelector, setIsShowModal} from "../../redux/form/formStore";


const Add: React.FC = () => {
  const {formNews} = useAppSelector(formSelector)
  const dispatch = useAppDispatch();
  const [isCollapse, setIsCollapse] = useState<boolean>(false)

  return (
    <>
      <Button htmlType="button"
              className={_style.btnCreate}
              type="primary"
              onClick={() => dispatch(setIsShowModal({key: 'news'}))}
      >
        <span>Редактировать</span>
        <PlusOutlined
          style={{fontSize: '16px', color: '#ffffff', fontWeight: 600}}
          twoToneColor="#eb2f96"
        />
      </Button>
      <Modal
        className={`${_style.modalForm} modalNews`}
        title={true ? "Публикация" : "Редактирование"}
        open={formNews.isShowModalNews}
        footer={[]}
      >
        <FormNews/>
      </Modal>
    </>
  )
}

export default Add