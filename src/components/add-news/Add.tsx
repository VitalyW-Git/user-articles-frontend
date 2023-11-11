import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import FormNews from "../ui/form/FormNews";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {formSelector, setIsShowModal, resetProperty} from "../../redux/form/formStore";
import _styles from "./Add.module.scss";
const MemoFormNews = React.memo(FormNews);

const Add: React.FC = () => {
  const {formNews} = useAppSelector(formSelector)
  const dispatch = useAppDispatch();

  /*const openAddArticle = useCallback(async () => {
    dispatch(resetProperty());
    dispatch(setIsShowModal({key: 'createNews'}))
  }, [])*/

  console.log('Add')
  return (
    <>
      <Button htmlType="button"
              className={_styles.btnCreate}
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
        className={`${_styles.modalForm} modalNews`}
        title={"Публикация"}
        open={formNews.isShowModalCreate}
        footer={[]}
      >
        <MemoFormNews
          isEdit={true}
          nameCancel={'createNews'}
        />
      </Modal>
    </>
  )
}

export default Add