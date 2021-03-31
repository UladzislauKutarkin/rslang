import PropTypes from "prop-types"
import Pragination from "../Pragination"
import AudioComponent from "../AudioComponent"

const WordCard = ({
  handleButtonClick,
  countPagination,
  page,
  userWordsVocabulary,
}) => {
  const CustomComponent = (item) => (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: item }} />
  )
  return (
    <div className="flex-auto flex-wrap justify-center m-5">
      <div className="container mx-auto mt-20 auto-rows-fr auto-cols-max grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {userWordsVocabulary[0]?.paginatedResults.map(
          ({ _id: id, ...item }) => (
            <div key={id} id={id}>
              <div>
                <div className="rounded-lg overflow-hidden">
                  <div className="relative overflow-hidden pb-60">
                    <img
                      className="absolute h-full w-full object-cover object-center"
                      src={`https://rs-lang-back.herokuapp.com/${item.image}`}
                      alt="img"
                    />
                  </div>
                  <div className="bg-blue-200">
                    <div className="py-10 px-8">
                      <h3 className="text-2xl font-bold">{item.word}</h3>
                      <h3 className="text-2xl font-bold">
                        {item.wordTranslate}
                      </h3>
                      <div className="text-gray-600 text-sm font-medium flex mb-4 mt-2">
                        <p>{item.transcription}</p>
                      </div>
                      <div className="h-72">
                        <p className="leading-7">
                          {CustomComponent(item.textMeaning)}
                        </p>
                        <p>{CustomComponent(item.textMeaningTranslate)}</p>
                        <p className="leading-7">
                          {CustomComponent(item.textExample)}
                        </p>
                        <p>{CustomComponent(item.textExampleTranslate)}</p>
                      </div>
                      <AudioComponent
                        audios={[
                          item.audio,
                          item.audioExample,
                          item.audioMeaning,
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Pragination
        countPagination={countPagination}
        handleClick={handleButtonClick}
        pageNumber={page}
      />
    </div>
  )
}

export default WordCard

WordCard.propTypes = {
  countPagination: PropTypes.number.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  userWordsVocabulary: PropTypes.arrayOf(PropTypes.object).isRequired,
}
