// import { useDispatch } from "react-redux"
// import { useState } from "react"
// import { setPageActionCreator } from "../../../redux/pages/pages"
import TeamMarket from "./TeamMarket"
import imgHeaderPromo from "../../../assets/img/english_promo_header.jpg"
import Footer from "../../Footer/Footer"
import ForWhom from "./ForWhom"
import LandingDescription from "./LandingDescription"
import photo1 from "../../../assets/img/photo/beiduk.jpg"
import photo2 from "../../../assets/img/photo/kutarkin.jpg"
import photo3 from "../../../assets/img/photo/yakubouski.jpg"

const HomePage = () => {
  // const [page] = useState("home")
  // const [showNavbar] = useState(true)
  // const dispatch = useDispatch()
  // dispatch(setPageActionCreator({ page, showNavbar }))
  return (
    <>
      <main>
        <div className="relative pt-80 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${imgHeaderPromo})`,
            }}
          />
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-3/4 px-4 ml-auto mr-auto text-center  bg-opacity-60 bg-white">
                <div className="pr-12  ">
                  <h1 className="text-black font-semibold text-5xl ">
                    Изучайте Англиский Вместе с Нами
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Не будет преувеличением сказать, что английский язык
                    является самым важным языком в мире. Почти половина
                    населения мира говорит на английском. Некоторые самые
                    большие страны в мире являются англоязычными, в том числе
                    США, Канада, Австралия и Великобритания.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <LandingDescription
                title="Английский язык в моей жизни"
                description=" Не секрет, что в настоящее время английский язык является самым
            популярным и распространенным языком в мире. Для этого есть много
            причин. Во-первых, это язык английской литературы и Шекспира.
            Во-вторых, он стал действительно важным в таких областях как туризм,
            бизнес, медицина, образование, информационные технологии,
            юриспруденция и т.д. В-третьих, английский язык мелодичен и
            практичен в изучении. Помимо этого, знание английского языка
            открывает безграничные возможности в развитии карьеры и в обучении."
              />
              <LandingDescription
                title="Изучение английского языка"
                description="Английский язык преподается в большинстве школ по всему
                миру, так как он сегодня имеет международное значение. Во
                многих странах изучения английского, в качестве второго
                языка, стало просто необходимым. Страна, где он на самом
                деле возник, это Великобритания, расширившая свою империю
                в результате длительной колонизации. Многие люди сегодня
                хотят изучать английский язык, так как понимают, как он
                важен в ведении бизнеса."
              />
              <LandingDescription
                title="Важность английского языка"
                description="Причины для изучения языков различны. Однако люди сходятся
                во мнении, что все языки предназначены для облегчения
                процесса коммуникации. На мой взгляд, родиться в
                многоязычной семье очень хорошо. Это означает, что ребенок
                будет расти, зная сразу несколько языков. В противном
                случае, придется изучать иностранные языки в школе,
                университете или любом другом учреждении."
              />
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-red-400">
                  <i className="fas fa-user-friends text-xl" />
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Как проходят занятия?
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Все занятия профессиональным английским языком проходят на
                  нашей интерактивной платформе самостоятельно.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  У вас будет личный интерактивный словарь, в который Вы можете
                  добавлять новую лексику. Специальные упражнения помогут
                  быстрее выучить слова и начать их использовать. Также Вы
                  можете обучаться в игровой форме, с помощью мини-игр.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-red-400">
                    <i className="fas fa-rocket text-xl" />
                  </div>
                  <h3 className="text-3xl font-semibold">
                    Преимущества обучения
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Действительно удобное расписание, в отличие от занятий в
                    группах. Вы можете выбрать время обучения самостоятельно.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Преподаватель подбирается лично под вас. Мы обязательно
                    постараемся подобрать человека с опытом работы, учебы или
                    преподавания именно в вашей профессиональной сфере. Также
                    учтем характеристики, которые вы укажете на вводном уроке.
                    Если преподаватель не понравился — бесплатно заменим.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Экономия времени. Занимайтесь где угодно: главное — иметь
                    под рукой компьютер,ноутбук или телефон. Не нужно тратить
                    время на дорогу до школы — лучше потратьте его на
                    профессиональное развитие или отдых.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold mt-12 text-gray-800">
                  Для кого подойдут наши курсы ?
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <ForWhom
                name="Студенты IT-специальностей"
                description="Интенсивная программа наших курсов дает возможность в первый месяц обучения, получить уровень знаний, требуемый для работы"
              />
              <ForWhom
                name="Хотите уехать из страны, но не знаете иностранного языка?"
                description="Мы можем органиовать выездную группы в англоговорящие страны, где можно совместить отдых и обучение, пообщаться с самими носителями языка"
              />
              <ForWhom
                name="Готовитесь к международным экзаменам?"
                description="Мы гарантируем положительный результат сдачи экзамена на необходимом Вам уровне"
              />
              <ForWhom
                name="Есть базовые знания, но Вы не знаете как их применить?"
                description="Вы будете обучаться по кембриджской методике, где акцент делается на общение, а не на конспектировании лекций"
              />
            </div>
          </div>
        </section>

        <section className="pt-12 pb-24">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
          <div className="container mt-16 mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-8">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Наша команда</h2>
              </div>
            </div>

            <div className="flex flex-wrap">
              <TeamMarket name="Yauheni Beiduk" photoURL={photo1} />
              <TeamMarket name="Uladzislau Kutarkin" photoURL={photo2} />
              <TeamMarket name="Alexandr Yakubouski" photoURL={photo3} />
              <TeamMarket name="Alexey Stalpec" photoURL={photo3} />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}
export default HomePage
