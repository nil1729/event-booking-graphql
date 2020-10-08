import React, { useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import EventContext from "../../context/Events/eventContext";

const Modal = ({ closeModal }) => {
  const d = new Date();
  const [today] = useState(
    `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? 0 : ""}${d.getMonth() + 1}-${
      d.getDate() < 10 ? 0 : ""
    }${d.getDate()}`
  );

  const [creating, setCreating] = useState(false);

  const eventContext = useContext(EventContext);
  const { createEvent } = eventContext;

  const titleEl = useRef();
  const descEl = useRef();
  const dateEl = useRef();
  const priceEl = useRef();

  const resetForm = () => {
    titleEl.current.value = "";
    descEl.current.value = "";
    priceEl.current.value = "";
    dateEl.current.value = `${today}T00:00`;
  };

  const handleSubmit = async (e) => {
    setCreating(true);
    e.preventDefault();
    const title = titleEl.current.value;
    const description = descEl.current.value;
    const price = +priceEl.current.value;
    const date = dateEl.current.value;
    if (title.trim().length === 0 || description.trim().length === 0) {
      return setCreating(false);
    }
    if (price <= 0) {
      return setCreating(false);
    }
    await createEvent(title, description, price, date);
    resetForm();
    setCreating(false);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Event</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form style={{ margin: "auto" }} onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  ref={titleEl}
                  className="form-control"
                  placeholder="Enter Title here"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  ref={priceEl}
                  className="form-control"
                  placeholder="Event Cost"
                  min="0"
                  step=".01"
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Schedule</label>
                <input
                  type="datetime-local"
                  ref={dateEl}
                  className="form-control"
                  placeholder="Select Date to Schedule"
                  defaultValue={`${today}T00:00`}
                  min={`${today}T00:00`}
                />
              </div>
              <div className="form-group">
                <label>Event Description</label>
                <textarea
                  ref={descEl}
                  required
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
              <div className="row my-1">
                <button
                  disabled={creating}
                  type="submit"
                  className="btn btn-sm btn-primary m-auto"
                >
                  {creating ? "Creating ..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
