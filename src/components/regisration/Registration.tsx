import React, {useState} from "react";
import {Modal} from "antd";
import FormModal from "./FormModal";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {formSelector, resetProperty} from "../../redux/form/formStore";
import _style from "./Registration.module.scss"


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
  const {isShowModal} = useAppSelector(formSelector)
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
      className={`${_style.modalForm} modalRegistration`}
      title={isStateForm ? "Войти" : "Регистрация"}
      open={isShowModal}
      footer={[]}
    >
      <FormModal
        formProperty={formProperty}
        isStateForm={isStateForm}
        onChange={() => resetStateForm()}
      />
      <span className={_style.authUser} onClick={() => changeStateForm()}>{isStateForm ? "Регистрация" : "Войти"}</span>
    </Modal>
  )
}

export default Registration