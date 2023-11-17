import React from "react";
import {useAppSelector} from "../../hook/redux";
import {newsSelector} from "../../redux/news/newsStore";
import AllNews from "../../components/list-news/AllNews";
import _styles from "./Main.module.scss"

const Main: React.FC = () => {
  const {successNews} = useAppSelector(newsSelector)
  console.log('Main')
  return (
    <>
      {successNews
        ? (<div className={_styles.content}>
          <AllNews />
        </div>)
        : (<div className={_styles.info}>
          Созданных записей нет. Для создания, пройдите регистрацию!
        </div>)}
    </>
  )
}

export default Main