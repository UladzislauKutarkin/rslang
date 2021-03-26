import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getVocabulary} from "../../../redux/vocabulary/vocabulary";
import Pragination from "./Pragination";
import {AudioComponent} from "./AudioComponent";


const TextBookPage = () => {
    const [page, setPage] = useState(0)
    const [pageVocabulary, setPageVocabulary] = useState([])
    const dispatch = useDispatch()
    const vocabulary = useSelector(({vocabulary})=> vocabulary.vocabulary)
    const isLoading = useSelector(({vocabulary}) => vocabulary.isLoading)
    useEffect(()=>{
            dispatch(getVocabulary(page,2))
    }, [getVocabulary, page])
    const handleButtonClick = (pageCounter)=> {
        console.log(pageCounter.selected)
        setPage(pageCounter.selected)
    }
    console.log(vocabulary)
    function CustomComponent(item) {
        return <div dangerouslySetInnerHTML={{__html: item}} />;
    }



    return (
        <div className='flex-auto flex-wrap justify-center'>
        <div class="container mx-auto mt-20 auto-rows-fr auto-cols-max grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {vocabulary.map(item=>{
              return  (<div className='flex-auto  self-stretch items-stretch justify-center' >
                      <div>
                          <div className="rounded-lg overflow-hidden">
                              <div className="relative overflow-hidden pb-60">
                                  <img
                                      className="absolute h-full w-full object-cover object-center"
                                      src={`https://rs-lang-back.herokuapp.com/${item.image}`}
                                      alt=""
                                  />
                              </div>
                              <div className="relative bg-blue-200">
                                  <div className="py-10 px-8">
                                      <h3 className="text-2xl font-bold">{item.word}</h3>
                                      <div className="text-gray-600 text-sm font-medium flex mb-4 mt-2">
                                          <p>{item.transcription}</p>
                                      </div>
                                      <p className="leading-7">
                                          {CustomComponent(item.textMeaning)}
                                      </p>
                                      <p>
                                          {CustomComponent(item.textMeaningTranslate)}
                                      </p>
                                      <p className="leading-7">
                                          {CustomComponent(item.textExample)}
                                      </p>
                                      <p>
                                          {CustomComponent(item.textExampleTranslate)}
                                      </p>
                                      <AudioComponent
                                      audio={item.audio}
                                      id={item.id}
                                      audioExample={item.audioExample}
                                      audioMeaning={item.audioMeaning}
                                      />
                                      <div className="mt-10 flex justify-between items-center">
                                          <div>
                                              <img
                                                  src="https://collect.criggzdesign.com/wp-content/uploads/2020/07/Ps.svg"
                                                  alt=""
                                                  className="w-6"
                                              />
                                          </div>
                                          <div className="m-6 space-x-3">
                                              <button
                                                  className="inline-block p-3 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                                              >
                                                  <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                                       viewBox="0 0 20 20" fill="currentColor">
                                                      <path
                                                          fillrule="evenodd"
                                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                          clip-rule="evenodd"
                                                      />
                                                  </svg>
                                              </button>
                                              <button
                                                  className="inline-block p-3 text-center text-white transition border border-yellow-500 rounded-full ripple hover:bg-yellow-100 focus:outline-none"
                                              >
                                                  <svg
                                                      className="w-5 h-5 text-yellow-500"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                      fill="currentColor"
                                                  >
                                                      <path
                                                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                      />
                                                  </svg>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                </div>
              )
            }
            )}
        </div>
          <Pragination handleClick={handleButtonClick}/>
        </div>
    )
}
export default TextBookPage;