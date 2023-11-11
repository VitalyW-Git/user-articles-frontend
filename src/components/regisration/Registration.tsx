import React, {useState} from "react";
import {Modal} from "antd";
import FormModal from "./FormModal";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {formSelector, resetProperty} from "../../redux/form/formStore";
import _styles from "./Registration.module.scss"


const Registration: React.FC = () => {
  const [isStateForm, setIsStateForm] = useState<boolean>(true)
  const formProperty = isStateForm
    ? {
      email: "",
      password: "",
    }
    : {
      username: "",
      email: "",
      password: "",
    }
  const {formAuth} = useAppSelector(formSelector)
  const dispatch = useAppDispatch();
  const changeStateForm = () => {
    setIsStateForm(!isStateForm)
    dispatch(resetProperty())
  }
  const resetStateForm = () => {
    setIsStateForm(true)
  }

  return (
    <Modal
      className={`${_styles.modalForm} modalAuth`}
      title={isStateForm ? "Войти" : "Регистрация"}
      open={formAuth.isShowModal}
      footer={[]}
    >
      <FormModal
        formProperty={formProperty}
        isStateForm={isStateForm}
        onChange={() => resetStateForm()}
      />
      <span className={_styles.authUser} onClick={() => changeStateForm()}>{isStateForm ? "Регистрация" : "Войти"}</span>
    </Modal>
  )
}

export default Registration