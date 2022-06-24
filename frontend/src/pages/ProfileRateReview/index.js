import './index.scss'
import ReviewForm from '../../components/ReviewForm'
import ReviewList from '../../components/ReviewList'
import ReviewProfile from '../../components/ReviewProfile'
import Comment from '../../components/Comment'

const ProfileRateReview = () => {
    return (
        // // Version 1
        <>
            <div className="ProfileRateReview">
                <div className='ReviewProfile-top'>
                    <ReviewProfile instructorId={'62a56dccfc13ae05bf00046d'} />
                </div>
                <div>
                    <ReviewList />
                </div>

                {/* <ReviewForm /> */}
                {/* <Comment /> */}
            </div>
        </>
    )
}

export default ProfileRateReview
