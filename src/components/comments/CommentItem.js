import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  let starRatingClass = "";

  const { rating } = props;

  //console.log(rating);

  switch (rating) {
    case "1":
      starRatingClass = `${classes.star_1}`;
      break;
    case "2":
      starRatingClass = `${classes.star_2}`;
      break;
    case "3":
      starRatingClass = `${classes.star_3}`;
      break;
    case "4":
      starRatingClass = `${classes.star_4}`;
      break;
    case "5":
      starRatingClass = `${classes.star_5}`;
      break;
    default:
      starRatingClass = "";
  }

  //console.log(starRatingClass);

  return (
    // <li>
    //   <p>{props.rating}</p>
    //   <p>{props.commentText}</p>
    //   <p>{props.commentDate}</p>
    // </li>
    <div>
      <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm mb-2">
        <div className="d-flex">
          <div className="col-7 p-4">
            <span className={classes.star_rating}>
              <i className={starRatingClass}></i>
              <i className={starRatingClass}></i>
              <i className={starRatingClass}></i>
              <i className={starRatingClass}></i>
              <i className={starRatingClass}></i>
            </span>
            <h6>{props.subject}</h6>
            <p className="card-text">{props.commentText}</p>
          </div>
          <div className="col text-end position-relative">
            <div className="position-absolute bottom-0 end-0 px-4">
              <h6>{props.nickname}</h6>
              <p className="text-muted">Reviewed on {props.commentDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
