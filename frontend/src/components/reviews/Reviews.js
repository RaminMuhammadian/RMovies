import React, { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef(null);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]);

  const addReview = async (e) => {
    e.preventDefault();

    if (revText.current) {
      const newReviewText = revText.current.value;

      try {
        const response = await api.post("/api/reviews", { reviewBody: newReviewText, imdbId: movieId });
        console.log(response.data);
        if (response.status === 200) {
          const updatedReviews = [...reviews, response.data];

          revText.current.value = ""; 
          setReviews(updatedReviews);
          
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  const removeReview = async (reviewId) => {
    try {
      const response = await api.delete(`/api/reviews/${reviewId}`);
      console.log(response);
      if (response.status === 200) {

        const updatedReviews = reviews.filter((review) => review.id !== reviewId); 
        setReviews(updatedReviews);
      } else {
        console.error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  
  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
          {reviews && reviews.length > 0 ? (
            reviews.map((r, index) => (
              <div key={index}>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                  <Button variant="danger" onClick={() => removeReview(r.id)}>Remove Review</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <div>No reviews available.</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews;
