"use client";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getMovieTrailers } from "../utils/requests.js";

const TrailerModal = ({ params }) => {
  const [openModal, setOpenModal] = useState(false);
  const [trailers, setTrailers] = useState([]);

  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const fetchedTrailers = await getMovieTrailers(params.id);
        setTrailers(fetchedTrailers);
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    };

    fetchTrailers();
  }, [params.id]);

  // for filtering official trailer only
  const officialTrailers = trailers.filter(
    (trailer) => trailer.name === "Official Trailer"
  );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Trailer
      </Button>

      {/* <Modal show={openModal} onHide={handleClose} className="">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> */}
      {/* start of section */}
      <section className="container my-3">
        {officialTrailers.map((trailer) => (
          <Modal show={openModal} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton>
              <Modal.Title>{trailer.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div key={trailer.id}>
                <p>Published At: {trailer.published_at}</p>
                <iframe
                  width="767"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: "0.5rem" }}
                ></iframe>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ))}
      </section>
      {/* End of section */}
      {/* </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default TrailerModal;
