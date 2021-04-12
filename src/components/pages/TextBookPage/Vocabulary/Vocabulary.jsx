import React from "react"
import Footer from "../../../Footer/Footer"
import VocabularyCard from "./VocabularyCard"

const Vocabulary = () => {
  return (
    <>
      <div className="mb-10">
        <VocabularyCard
          className="max-w-screen-lg bg-orange-500 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
          name="Изученные слова"
          src="/studied/"
        />
        <VocabularyCard
          className="max-w-screen-lg bg-indigo-500 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
          name="Cложные слова"
          src="/wordbook/"
        />
        <VocabularyCard
          className="max-w-screen-lg bg-green-600 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
          name="Удаленные слова"
          src="/deleted/"
        />
      </div>
      <Footer />
    </>
  )
}

export default Vocabulary
