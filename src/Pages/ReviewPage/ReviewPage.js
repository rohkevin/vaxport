import React from 'react'
import { useGlobalContext } from '../../context'

import ReviewPass from '../../Components/ReviewStatus/ReviewPass/ReviewPass'
import ReviewFail from '../../Components/ReviewStatus/ReviewFail/ReviewFail'

function ReviewPage() {
  const { reviewStatus } = useGlobalContext();
  
  return (
    <main>
      {reviewStatus ? <ReviewPass /> : <ReviewFail />}
    </main>
  )
}

export default ReviewPage
