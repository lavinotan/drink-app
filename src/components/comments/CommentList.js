import CommentItem from "./CommentItem";
import { Fragment } from "react";

const CommentList = (props) => {
  //console.log(props.comments);

  return (
    <Fragment>
      <div className="mb-3">
        <h4>Reviews</h4>
      </div>

      {props.comments.length > 0 ? (
        props.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            commentText={comment.commentText}
            rating={comment.rating}
            commentDate={comment.commentDate}
            subject={comment.subject}
            nickname={comment.nickname}
          />
        ))
      ) : (
        <div>There is no review yet.</div>
      )}
    </Fragment>
  );
};

export default CommentList;
