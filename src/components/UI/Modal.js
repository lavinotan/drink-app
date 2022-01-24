import { Fragment } from "react";
import ReactDOM from "react-dom";

const ModalContent = (props) => {
  return (
    <div
      className="modal modal-sheet d-block bg-secondary bg-opacity-75 py-5"
      tabIndex="-1"
      role="dialog"
      id="modalSheet"
      onClick={props.onHideModal}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-6 shadow">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={props.onHideModal}
            ></button>
          </div>
          <div className="modal-body py-0">
            <p>{props.message}</p>
          </div>
          <div className="modal-footer flex-nowrap p-0">
            <button
              type="button"
              className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
              onClick={props.onRemoveDrinkConfirmed}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
              data-bs-dismiss="modal"
              onClick={props.onHideModal}
            >
              <strong>No thanks</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalContent
          title={props.title}
          message={props.message}
          onHideModal={props.onHideModal}
          onRemoveDrinkConfirmed={props.onRemoveDrinkConfirmed}
        />,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
