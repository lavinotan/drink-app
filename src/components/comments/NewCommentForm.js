import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCommentData } from "../../store/drink-action";
import Card from "../UI/Card";

import "./NewCommentForm.css";

const NewCommentForm = (props) => {
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const [ratingInput, setRatingInput] = useState("");
  const [isCommentAdded, setIsCommentAdded] = useState(false);
  const commentInputRef = useRef();
  const formRef = useRef();
  const subjectInputRef = useRef();
  const nicknameInputRef = useRef();

  const dataStatus = useSelector((state) => state.ui.dataStatus);

  const { onAddComment } = props;

  useEffect(() => {
    if (isCommentAdded && dataStatus.status === "success") {
      onAddComment();
      setIsCommentAdded(false);
    }
  }, [onAddComment, isCommentAdded, dataStatus]);

  const ratingInputChangeHandler = (event) => {
    setRatingInput(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredComment = commentInputRef.current.value;
    const enteredRating = ratingInput;
    const enteredSubject = subjectInputRef.current.value;
    const enteredNickname = nicknameInputRef.current.value;

    let today = new Date();

    const currentDate =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();

    setDate(currentDate);

    console.log(currentDate);
    //console.log(props.drinkId);

    dispatch(
      sendCommentData({
        commentData: {
          commentText: enteredComment,
          rating: enteredRating,
          commentDate: date,
          subject: enteredSubject,
          nickname: enteredNickname,
        },
        drinkId: props.drinkId,
      })
    );

    setIsCommentAdded(true);
    //console.log(enteredRating);

    formRef.current.reset();
  };
  return (
    <Card>
      <form
        onSubmit={submitFormHandler}
        ref={formRef}
        className="needs-validation"
        noValidate
      >
        <div className="row g-3">
          <div className="col-sm-6 mb-3">
            <label htmlFor="rating" className="form-label">
              Your Rating
            </label>
            <span className="star-rating">
              <input
                type="radio"
                name="rating1"
                value="1"
                onChange={ratingInputChangeHandler}
              />
              <i></i>
              <input
                type="radio"
                name="rating1"
                value="2"
                onChange={ratingInputChangeHandler}
              />
              <i></i>
              <input
                type="radio"
                name="rating1"
                value="3"
                onChange={ratingInputChangeHandler}
              />
              <i></i>
              <input
                type="radio"
                name="rating1"
                value="4"
                onChange={ratingInputChangeHandler}
              />
              <i></i>
              <input
                type="radio"
                name="rating1"
                value="5"
                onChange={ratingInputChangeHandler}
              />
              <i></i>
            </span>
          </div>
        </div>
        <div className="col-sm-6 mb-2">
          <label htmlFor="nickname" className="form-label">
            Nickname
          </label>
          <input
            id="nickname"
            ref={nicknameInputRef}
            className="form-control"
          />
        </div>
        <div className="col-sm-6 mb-2">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input id="subject" ref={subjectInputRef} className="form-control" />
        </div>
        <div className="col-12">
          <label htmlFor="comment" className="form-label">
            Your Review
          </label>
          <textarea
            id="comment"
            rows="5"
            ref={commentInputRef}
            className="form-control"
          ></textarea>
        </div>

        <hr className="my-4" />
        <div className="btnContainer">
          <button type="submit" className="btn btn-primary btn-sm">
            Add
          </button>
        </div>
      </form>
    </Card>
  );
};

export default NewCommentForm;
