import CardTable from "../../statistics/CardTable"
import CardStats from "../../statistics/CardStats"
import imgHeader from "../../../assets/img/english_statistics_header+.jpg"
import Footer from "../../Footer/Footer"

const StatisticsPage = () => {
  const stats = [
    {
      title: "Саванна",
      all: 100,
      right: 85,
      wrong: 15,
    },
    {
      title: "Аудио вызов",
      all: 78,
      right: 70,
      wrong: 8,
    },
    {
      title: "Спринт",
      all: 50,
      right: 40,
      wrong: 10,
    },
    {
      title: "Ворд Пазл",
      all: 60,
      right: 35,
      wrong: 25,
    },
  ]

  return (
    <>
      <main className="profile-page pt-16">
        <section
          className="relative block h-500-px"
          style={{ height: "500px" }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${imgHeader})`,
            }}
          />
        </section>

        <section className="relative py-16 bg-blueGray-200 ">
          {stats.map((el) => {
            return <CardStats key={el.title} game={el} />
          })}
          <CardTable />
        </section>
        <Footer />
      </main>
    </>
  )
}
export default StatisticsPage
