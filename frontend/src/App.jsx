import './App.css'
import Navbar from './components/navbar/navbar'
import Loader from './components/loader/loader'
import ReviewFile from './components/review-file/review-file'
import ReviewCard from './components/review-card/review-card'
import { useState } from 'react'
import LLMConnection from './utils/llm-connection'

function App() {
  const [data, setData] = useState({});
  const [bannerData, setBannerData] = useState("");
  const [loaderStatus, setLoaderStatus] = useState(false);

  const handleSetData = async (codeString) => {
    setLoaderStatus(true);
    let result = await LLMConnection(codeString);

    const {
			bugs = [],
			performance = [],
			security = [],
			quality = [],
			severity = ""
		} = result || {};

    setData({bugs, performance, security, quality});
    setBannerData(severity);
    setLoaderStatus(false);
  };


  return (
    <>
      <Navbar />
      {(loaderStatus) && <Loader />}
      <div className='container mt-4'>
          {(bannerData) && <div className="text-light alert-container" role="alert">
            <span className='fw-bold'>Severity: </span><span>{bannerData}</span>
          </div>}
        </div>
      <div className='mt-4'>
        <ReviewFile onChildData={handleSetData}/>
      </div>
      {(Object.entries(data).length > 0) &&
        <div id="code-bugs" className="container mt-4">
          <div className="row">
            {Object.entries(data).map(([key, value]) =>
              <div className="col-3" key={key} >
                <ReviewCard cardName={key} cardLength={value.length} listArr={value} />
              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}

export default App
