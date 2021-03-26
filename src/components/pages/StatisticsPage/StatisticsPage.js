 import img_header from '../../../assets/img/english_statistics_header+.jpg'


const StatisticsPage = () => {
    return (
        <>
     
        <main className="profile-page pt-16">
          <section className="relative block h-500-px" style = {{height: '500px'}}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  `url(${img_header})`,
              }}
            >
            </div>
          </section>
          
          <section className="relative py-16 bg-blueGray-200 ">
           
          </section>
        </main>
      </>
    )
}
export default StatisticsPage;