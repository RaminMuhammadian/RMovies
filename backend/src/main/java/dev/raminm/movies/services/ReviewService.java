package dev.raminm.movies.services;

import dev.raminm.movies.entities.Movie;
import dev.raminm.movies.entities.Review;
import dev.raminm.movies.repositories.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Review> findAllReviews() {
        return repository.findAll();
    }

    public Review createReview(String reviewBody, String imdbId) {
        Review review = repository.insert(new Review(reviewBody, LocalDateTime.now(), LocalDateTime.now()));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviews").value(review))
                .first();

        return review;
    }

    public void deleteReview(ObjectId reviewId) {

        Optional<Review> reviewOptional = repository.findById(reviewId);

        if (reviewOptional.isPresent()) {
            Review review = reviewOptional.get();

            repository.delete(review);

            mongoTemplate.update(Movie.class)
                    .matching(Criteria.where("reviews.id.timestamp").is(review.getCreated()))
                    .apply(new Update().pull("reviews", new Query(Criteria.where("id.timestamp").is(review.getCreated()))))
                    .first();
        }
    }
}
