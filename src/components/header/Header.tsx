import React from "react";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {setIsShowModal} from "../../redux/form/formStore";
import Registration from "../regisration/Registration";
import {userSelector} from "../../redux/user/userStore";
import type {MenuProps} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Button, Avatar, Dropdown, Spin} from "antd";
import _styles from "./Header.module.scss"

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a href="/user">
        Опубликованные
        новости
      </a>
    ),
  },
];

const Header: React.FC = () => {
  const {user, isLoading} = useAppSelector(userSelector)
  const dispatch = useAppDispatch();
  console.log('Header')
  return (
    <>
      <div className={_styles.header}>
        {isLoading && (<Spin size="large"/>)}
        {!isLoading && !user.isAuth && (
          <>
            <Button type="primary"
                    onClick={() => dispatch(setIsShowModal({key: 'auth'}))}>
              Войти
            </Button>
            <Registration/>
          </>)}
        {!isLoading && user.isAuth && (
          <Dropdown menu={{items}} placement="bottomRight" arrow={{pointAtCenter: true}}>
            <div className={_styles.avatar}>
              <Avatar size="large" icon={<UserOutlined/>}/>
              <span className={_styles.avatar__title}>
              {user.username}
            </span>
            </div>
          </Dropdown>)}
      </div>
    </>
  )
}

export default Header