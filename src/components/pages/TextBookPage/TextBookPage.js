import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getVocabulary} from "../../../redux/vocabulary/vocabulary";


const TextBookPage = () => {
    const [page, setPage] = useState(0)
    const [pageVocabulary, setPageVocabulary] = useState([])
    const dispatch = useDispatch()
    const vocabulary = useSelector(({vocabulary})=> vocabulary.vocabulary)
    const isLoading = useSelector(({vocabulary}) => vocabulary.isLoading)
    useEffect(()=>{
            dispatch(getVocabulary(page,2))
    }, [getVocabulary, page])
    const handleButtonClick = (e)=> {
        setPage(4)
        e.target.classList.add('bg-teal-600')
    }
    console.log(vocabulary)
    function CustomComponent(item) {
        return <div dangerouslySetInnerHTML={{__html: item}} />;
    }


    return (
        <div className='flex-auto flex-wrap justify-center'>
        <div className='flex-auto flex-wrap justify-center'>
            {vocabulary.map(item=>{
              return  (<div className='flex-auto flex-wrap justify-center' >
                    <span>{item.word}</span>
                  <span style={{
                      padding:'10px'
                  }}>{item.wordTranslate}</span>
                  <img style={{
                      width: '100px',
                      height: '100px'
                  }} src={`https://rs-lang-back.herokuapp.com/${item.image}`
                  }/>
                  <span>{CustomComponent(item.textExample)}</span>
                  <span>{item.transcription}</span>
                  <span>{item.textExampleTranslate}</span>
                  <span>{CustomComponent(item.textMeaning)}</span>
                  <audio controls src={`https://rs-lang-back.herokuapp.com/${item.audio}`}></audio>
                </div>
              )
            }
            )}
        </div>
            <div className="flex flex-col items-center my-12">
                <div className="flex text-gray-700">
                    <div
                        className="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" className="feather feather-chevron-left w-6 h-6">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </div>
                    <div className="flex h-12 font-medium rounded-full bg-gray-200">
                        <div
                            className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">1
                        </div>
                        <div
                            className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">2
                        </div>
                        <div onClick={handleButtonClick}
                            className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  bg-teal-600 text-white">3
                        </div>
                        <div
                            className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">...
                        </div>
                        <div
                            className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">13
                        </div>
                        <div
                            className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">14
                        </div>
                        <div
                            className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">15
                        </div>
                        <div
                            className="w-12 h-12 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-teal-600 text-white">2
                        </div>
                    </div>
                    <div
                        className="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" className="feather feather-chevron-right w-6 h-6">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TextBookPage;