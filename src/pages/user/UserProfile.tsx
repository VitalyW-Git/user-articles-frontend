import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionAllListNews, userSelector} from "../../redux/user/userStore";
import {NewsAllType} from "../../tupes/news/NewsAll.type";
import {Button} from "antd";
import Add from "../../components/add-news/Add";
import _styles from "./UserProfile.module.scss";


const UserProfile: React.FC = () => {
  const {userNews} = useAppSelector(userSelector)
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    await dispatch(actionAllListNews());
  };
  const edit = () => {
    console.log(123)
  }
  const listNews = userNews?.map((item: NewsAllType) => {
    const startDate = new Date(item.date_start);
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
            <span className={_styles.description}>
            {item.description}
          </span>
            <span className={_styles.date}>
              {startDate.toLocaleDateString('ru-RU')}
            </span>
          </div>
        )
      );

  });

  useEffect(() => {
    fetchData()
  }, [])
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