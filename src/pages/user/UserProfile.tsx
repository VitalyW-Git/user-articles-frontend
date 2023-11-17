import React, {useLayoutEffect, useMemo, useRef} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {Modal} from "antd";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionAllListNews, userSelector} from "../../redux/user/userStore";
import {formSelector} from "../../redux/form/formStore";
import FormNews from "../../components/ui/form/FormNews";
import Add from "../../components/add-news/Add";
import News from "../../components/list-news/News";
import _styles from "./UserProfile.module.scss";

const UserProfile: React.FC = () => {
  const {userNews, isLoading, user} = useAppSelector(userSelector)
  const {formNews} = useAppSelector(formSelector)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    (async () => {
      if (!isLoading && !user.isAuth) {
        navigate('/', { replace: true });
        return
      }
      await dispatch(actionAllListNews());
    })()
    console.log(isLoading, 'isLoading')
  }, [isLoading])

  const MemoizedAdd = useMemo(() => <Add />, []);
  const MemoizedNews = useMemo(() => <News />, []);

  return (
    <>
      {MemoizedAdd}
      {userNews.length
        ? (<div className={_styles.content}>
          {MemoizedNews}
        </div>)
        : (<div className={_styles.info}>Созданных записей нет.</div>)}
      <Modal
        className={`modalNews`}
        title={"Редактирование"}
        open={formNews.isShowModalEdit}
        footer={[]}
      >
        <FormNews
          isEdit={false}
          nameCancel={'editNews'}
        />
      </Modal>
    </>
  )
}

export default UserProfile