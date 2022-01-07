import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";
import { fetchCommentData } from "../../store/drink-action";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const comments = useSelector((state) => state.comment.comments);

  const dataStatus = useSelector((state) => state.ui.dataStatus);

  const isLoading = !dataStatus || dataStatus.status === "pending";

  const dispatch = useDispatch();
  const params = useParams();

  const { drinkId } = params;

  useEffect(() => {
    dispatch(fetchCommentData(drinkId));
  }, [dispatch, drinkId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    dispatch(fetchCommentData(drinkId));
    console.log("addedCommentHandler");
  }, [dispatch, drinkId]);

  return (
    <section className={classes.commentContainer}>
      {isLoading ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <CommentList comments={comments} />
      )}
      <div className="my-5">
        <h4 className="mb-3">Write a Drink Review</h4>
        {!isAddingComment && (
          <button
            onClick={startAddCommentHandler}
            className="btn btn-primary btn-sm"
          >
            Add a Review
          </button>
        )}

        {isAddingComment && (
          <div className="g-0 border rounded overflow-hidden shadow-sm position-relative mb-4">
            <NewCommentForm
              drinkId={props.drinkId}
              onAddComment={addedCommentHandler}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Comments;
