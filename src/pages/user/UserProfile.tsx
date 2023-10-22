import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionAllListNews, userSelector} from "../../redux/user/userStore";
import {NewsAllType} from "../../tupes/news/NewsAll.type";
import _styles from "../main/Button.module.scss";


const UserProfile: React.FC = () => {
  const {userNews} = useAppSelector(userSelector)
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    await dispatch(actionAllListNews());
  };
  console.log(userNews)
  const listNews = userNews?.map((item: NewsAllType) => {
    const startDate = new Date(item.date_start);
      return (
        item.status && (
          <div key={item._id} className={_styles.article}>
          <span className={_styles.title}>
            {item.title}
          </span>
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
      {userNews.length
        ? (<div className={_styles.content}>
          {listNews}
        </div>)
        : (<div className={_styles.info}>Созданных записей нет.</div>)}
    </>
  )
}

export default UserProfile