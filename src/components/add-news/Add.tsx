import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import _style from "./Add.module.scss";
import FormNews from "./form/FormNews";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {formSelector, setIsShowModal, resetProperty} from "../../redux/form/formStore";


const Add: React.FC = () => {
  const {formNews} = useAppSelector(formSelector)
  const dispatch = useAppDispatch();

  return (
    <>
      <Button htmlType="button"
              className={_style.btnCreate}
              type="primary"
              onClick={() => {
                dispatch(resetProperty());
                dispatch(setIsShowModal({key: 'createNews'}))
              }}
      >
        <span>Опубликовать</span>
        <PlusOutlined
          style={{fontSize: '16px', color: '#ffffff', fontWeight: 600}}
          twoToneColor="#eb2f96"
        />
      </Button>
      <Modal
        className={`${_style.modalForm} modalNews`}
        title={"Публикация"}
        open={formNews.isShowModalCreate}
        footer={[]}
      >
        <FormNews
          isEdit={true}
          nameCancel={'createNews'}
        />
      </Modal>
    </>
  )
}

export default Add