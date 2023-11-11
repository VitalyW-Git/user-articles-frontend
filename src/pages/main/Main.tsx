import React, {useLayoutEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionGetAllNews, newsSelector} from "../../redux/news/newsStore";
import AllNews from "../../components/list-news/AllNews";
import _styles from "./Main.module.scss"

const Main: React.FC = () => {
  const {successNews} = useAppSelector(newsSelector)
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    (async () => {
      await dispatch(actionGetAllNews());
    })()
  }, [])

  return (
    <>
      {successNews
        ? (<div className={_styles.content}>
          <AllNews />
        </div>)
        : (<div className={_styles.info}>Созданных записей нет. Для создания, пройдите регистрацию!</div>)}
    </>
  )
}

export default Main