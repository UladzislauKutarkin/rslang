import imgHeader from "../../../assets/img/english_statistics_header+.jpg"

const StatisticsPage = () => (
  <>
    <main className="profile-page pt-16">
      <section className="relative block h-500-px" style={{ height: "500px" }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${imgHeader})`,
          }}
        />
      </section>

      <section className="relative py-16 bg-blueGray-200 " />
    </main>
  </>
)
export default StatisticsPage
