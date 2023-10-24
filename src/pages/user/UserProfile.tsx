import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionAllListNews, userSelector} from "../../redux/user/userStore";
import {NewsType} from "../../tupes/news/News.type";
import {Button} from "antd";
import Add from "../../components/add-news/Add";
import _styles from "./UserProfile.module.scss";


const UserProfile: React.FC = () => {
  const {userNews, isLoading, user} = useAppSelector(userSelector)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    if (!isLoading && !user.isAuth) {
      navigate('/', { replace: true });
      return
    }
    await dispatch(actionAllListNews());
  };
  const edit = () => {
    console.log(123)
  }
  const listNews = userNews?.map((item: NewsType) => {
    const startDate = new Date(item.date_start);
    const publicDate = `${startDate.getHours()} ч. ${startDate.getMinutes()} мин. ${startDate.toLocaleDateString('ru-RU')}`
      return (
        item.status && (
          <div key={item._id} className={_styles.article}>
            <div className={_styles.edit}>
              <span className={_styles.title}>
                {item.title}
              </span>
              <Button type="primary"
                      onClick={() => edit()}>
                Редактировать
              </Button>
            </div>
            <span className={_styles.description} dangerouslySetInnerHTML={{ __html: item.description }} />
            <span className={_styles.date}>
              {publicDate}
            </span>
          </div>
        )
      );
  });

  useEffect(() => {
    fetchData()
  }, [isLoading])
  return (
    <>
      <Add />
      {userNews.length
        ? (<div className={_styles.content}>
          {listNews}
        </div>)
        : (<div className={_styles.info}>Созданных записей нет.</div>)}
    </>
  )
}

export default UserProfile